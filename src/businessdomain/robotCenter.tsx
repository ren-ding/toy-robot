import deepFreeze from 'deep-freeze';

interface Robot {
    position: Array<number>,
    faceDirection: string,
    reportHistory?: Array<string>
}

interface Action {
    type: string,
    position?: Array<number>,
    faceDirection?: string
}

const DIRECTION = ['NORTH','EAST','SOUTH','WEST'];

const reducer = (state:Robot={position:[0,0],faceDirection:'NORTH',reportHistory:[]}, action:Action):Robot => {
    const mapSize:Array<Number> = [5,5];
    deepFreeze(mapSize);

    Object.freeze(DIRECTION);

    const directionIndex:number = DIRECTION.indexOf(state.faceDirection);
    const generateReportHistory = (state:Robot):string => state.position[0]+','+state.position[1]+','+state.faceDirection;

    switch(action.type){
        case 'PLACE':
            if(action.position == undefined 
            || action.faceDirection == undefined
            || action.position[0] < 0
            || action.position[0] >= mapSize[0]
            || action.position[1] < 0
            || action.position[1] >= mapSize[1]) 
                return state;
            
            return {...state, ...{position:action.position, faceDirection:action.faceDirection}}
        case 'MOVE':
            if(state.faceDirection == 'NORTH' && state.position[1] + 1 < mapSize[1])
                return {...state, ...{position: [state.position[0], state.position[1]+1]}};
            if(state.faceDirection == 'SOUTH' && state.position[1] - 1 >= 0)
                return {...state, ...{position: [state.position[0], state.position[1]-1]}};
            if(state.faceDirection == 'EAST' && state.position[0] + 1 < mapSize[0])
                return {...state, ...{position: [state.position[0]+1, state.position[1]]}};
            if(state.faceDirection == 'WEST' && state.position[0] - 1 >= 0)
                return {...state, ...{position: [state.position[0] -1, state.position[1]]}};
            return state;
        case 'LEFT':
            return directionIndex - 1 < 0 ? {...state, ...{faceDirection:DIRECTION[3]}} : {...state, ...{faceDirection:DIRECTION[directionIndex - 1]}};
        case 'RIGHT':
            return directionIndex + 1 >= DIRECTION.length ? {...state, ...{faceDirection:DIRECTION[0]}} : {...state, ...{faceDirection:DIRECTION[directionIndex + 1]}};
        case 'REPORT':
            return state.reportHistory? 
                {...state,...{reportHistory:[...state.reportHistory, generateReportHistory(state)]}}
                :{...state,...{reportHistory:[generateReportHistory(state)]}};
        default:
            return state;
    }
}

const inputCommandsConverter = (commandsString:string):Array<Action> => {
    Object.freeze(DIRECTION);

    return commandsString.split('\n').map(commandString=>{
        if(commandString.startsWith('PLACE')){
            const info = commandString.split(' ')[1];
            if(info == undefined) return {type:'UNKNOWN'};
            const infoArray = info.split(',');
            if(infoArray.length!= 3) return {type:'UNKNOWN'};
            const positionX = parseInt(infoArray[0]);
            const positionY = parseInt(infoArray[1]);
            if(isNaN(positionX) || isNaN(positionY) || !DIRECTION.includes(infoArray[2])) return {type:'UNKNOWN'};
            return {type:'PLACE', position:[parseInt(infoArray[0]),parseInt(infoArray[1])], faceDirection:infoArray[2]};
        }

        if(commandString === 'MOVE') return {type:'MOVE'};
        if(commandString === 'LEFT') return {type:'LEFT'};
        if(commandString === 'RIGHT') return {type:'RIGHT'};
        if(commandString === 'REPORT') return {type:'REPORT'};
        
        return {type:'UNKNOWN'};
    });
};

export {reducer,inputCommandsConverter}