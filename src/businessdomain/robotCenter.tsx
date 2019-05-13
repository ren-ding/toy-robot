import deepFreeze from 'deep-freeze';
import Robot from './Robot';
import RobotMap from './RobotMap';
import Position from './Position';

export interface State {
    robot: Robot;
    map: RobotMap;
    reportHistory: Array<string>;
}

export interface Action {
    type: string,
    position?: Position,
    faceDirection?: string
}

const canPlace = (position:Position, faceDirection:string, map:RobotMap):boolean => {
    return (position.x >= 0 &&
            position.x < map.width &&
            position.y >= 0 &&
            position.y < map.height &&
            DIRECTION.includes(faceDirection));      
}

const move = (position:Position, faceDirection:string, map:RobotMap):Position =>{
    if(faceDirection === 'NORTH' && position.y + 1 < map.height)
        return {x:position.x, y:position.y+1};
    if(faceDirection === 'SOUTH' && position.y - 1 >= 0)
        return {x:position.x, y:position.y-1};
    if(faceDirection === 'EAST' && position.x + 1 < map.width)
        return {x:position.x+1, y:position.y};
    if(faceDirection === 'WEST' && position.x - 1 >= 0)
        return {x:position.x -1, y:position.y};
    return position;
}

const rotate = (faceDirection:string, rotateDirection:string):string => {
    const directionIndex:number = DIRECTION.indexOf(faceDirection);
    switch(rotateDirection){
        case 'LEFT':
            return DIRECTION[(directionIndex - 1 + DIRECTION.length) % DIRECTION.length ];
        case 'RIGHT':
            return DIRECTION[(directionIndex + 1) % DIRECTION.length ];
        default:
            return faceDirection;
    }
}

const newHistory = (robot:Robot):string => robot.position.x+','+robot.position.y+','+robot.faceDirection;

const DIRECTION = ['NORTH','EAST','SOUTH','WEST'];

const reducer = (state:State={robot:{position:{x:0,y:0},faceDirection:'NORTH'}, map:{width:5,height:5}, reportHistory:[]}, action:Action):State => {
    deepFreeze(state);
    Object.freeze(DIRECTION);

    switch(action.type){
        case 'PLACE': 
            if (action.position === undefined ||
                action.faceDirection === undefined ||
                !canPlace(action.position,action.faceDirection,state.map)) return state;
            return {...state, robot:{ position: {x:action.position.x, y:action.position.y}, faceDirection: action.faceDirection} }
        case 'MOVE': 
            return {...state, robot:{ position: move(state.robot.position, state.robot.faceDirection, state.map), faceDirection: state.robot.faceDirection} };
        case 'LEFT':
        case 'RIGHT':  
            return {...state, robot:{ position: state.robot.position, faceDirection: rotate(state.robot.faceDirection,action.type)} };
        case 'REPORT':
            return {...state, reportHistory:[...state.reportHistory, newHistory(state.robot)]};
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
            return {type:'PLACE', position:{x:positionX, y:positionY}, faceDirection:infoArray[2]};
        }

        if(commandString === 'MOVE') return {type:'MOVE'};
        if(commandString === 'LEFT') return {type:'LEFT'};
        if(commandString === 'RIGHT') return {type:'RIGHT'};
        if(commandString === 'REPORT') return {type:'REPORT'};
        
        return {type:'UNKNOWN'};
    });
};

export {reducer,inputCommandsConverter}