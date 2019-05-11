interface Robot {
    mapSize: Array<number>,
    position: Array<number>,
    faceDirection: string,
    reportHistory?: Array<string>
}

interface Action {
    type: string,
    position?: Array<number>,
    faceDirection?: string
}

const place = (state:Robot, action:Action):Robot => {
    if(action.position === undefined 
        || action.faceDirection === undefined
        || action.position[0] < 0
        || action.position[0] >= state.mapSize[0]
        || action.position[1] < 0
        || action.position[1] >= state.mapSize[1]) 
            return state;
        
        return {...state, ...{position:action.position, faceDirection:action.faceDirection}}
}

const move = (state:Robot):Robot =>{
    if(state.faceDirection === 'NORTH' && state.position[1] + 1 < state.mapSize[1])
        return {...state, ...{position: [state.position[0], state.position[1]+1]}};
    if(state.faceDirection === 'SOUTH' && state.position[1] - 1 >= 0)
        return {...state, ...{position: [state.position[0], state.position[1]-1]}};
    if(state.faceDirection === 'EAST' && state.position[0] + 1 < state.mapSize[0])
        return {...state, ...{position: [state.position[0]+1, state.position[1]]}};
    if(state.faceDirection === 'WEST' && state.position[0] - 1 >= 0)
        return {...state, ...{position: [state.position[0] -1, state.position[1]]}};
    return state;
}

const rotate = (state:Robot, action:Action):Robot => {
    const directionIndex:number = DIRECTION.indexOf(state.faceDirection);
    switch(action.type){
        case 'LEFT':
            return {...state, ...{faceDirection:DIRECTION[(directionIndex - 1 + DIRECTION.length) % DIRECTION.length ]}}
        case 'RIGHT':
            return {...state, ...{faceDirection:DIRECTION[(directionIndex + 1) % DIRECTION.length ]}}
        default:
            return state;
    }
}

const report = (state:Robot):Robot => {
    const generateReportHistory = (state:Robot):string => state.position[0]+','+state.position[1]+','+state.faceDirection;
    return state.reportHistory?{...state,...{reportHistory:[...state.reportHistory, generateReportHistory(state)]}}
                              :{...state,...{reportHistory:[generateReportHistory(state)]}};
}

const DIRECTION = ['NORTH','EAST','SOUTH','WEST'];

const reducer = (state:Robot={mapSize:[5,5], position:[0,0],faceDirection:'NORTH',reportHistory:[]}, action:Action):Robot => {
    Object.freeze(state.mapSize);
    Object.freeze(DIRECTION);

    switch(action.type){
        case 'PLACE': 
            return place(state,action);
        case 'MOVE': 
            return move(state);
        case 'LEFT':
        case 'RIGHT':
            return rotate(state,action);
        case 'REPORT':
            return report(state);
        default:
            return state;
    }
}

const inputCommandsConverter = (commandsString:string):Array<Action> => {
    Object.freeze(DIRECTION);
    const placePatt =  /^PLACE\s\d+,\d+,(NORTH|EAST|SOUTH|WEST)$/g;

    return commandsString.split('\n').map(commandString=>{
        if(placePatt.test(commandString)){
            const infoArray = commandString.split(' ')[1].split(',');
            const positionX = parseInt(infoArray[0]);
            const positionY = parseInt(infoArray[1]);
            return {type:'PLACE', position:[positionX,positionY], faceDirection:infoArray[2]};
        }

        if(commandString === 'MOVE') return {type:'MOVE'};
        if(commandString === 'LEFT') return {type:'LEFT'};
        if(commandString === 'RIGHT') return {type:'RIGHT'};
        if(commandString === 'REPORT') return {type:'REPORT'};
        
        return {type:'UNKNOWN'};
    });
};

export {reducer,inputCommandsConverter}