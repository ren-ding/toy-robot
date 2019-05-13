import deepFreeze from 'deep-freeze';
import Robot from './Robot';
import RobotMap from './RobotMap';
import Position from './Position';
import {DIRECTION, numOfEnumElements} from './Enumeration'

export interface State {
    robot: Robot;
    map: RobotMap;
    reportHistory: Array<string>;
}

export interface Action {
    type: string,
    position?: Position,
    faceDirection?: DIRECTION
}

const canPlace = (position:Position, faceDirection:DIRECTION, map:RobotMap):boolean => {
    return (position.x >= 0 &&
            position.x < map.width &&
            position.y >= 0 &&
            position.y < map.height &&
            faceDirection in DIRECTION
            );      
}

const move = (position:Position, faceDirection:DIRECTION, map:RobotMap):Position =>{
    if(faceDirection === DIRECTION.NORTH && position.y + 1 < map.height)
        return {x:position.x, y:position.y+1};
    if(faceDirection === DIRECTION.SOUTH && position.y - 1 >= 0)
        return {x:position.x, y:position.y-1};
    if(faceDirection === DIRECTION.EAST && position.x + 1 < map.width)
        return {x:position.x+1, y:position.y};
    if(faceDirection === DIRECTION.WEST && position.x - 1 >= 0)
        return {x:position.x -1, y:position.y};
    return position;
}

const rotate = (faceDirection:DIRECTION, rotateDirection:string):DIRECTION => {
    const numOfDirection = numOfEnumElements(DIRECTION);
    switch(rotateDirection){
        case 'LEFT':
            return (faceDirection - 1 + numOfDirection) % numOfDirection;
        case 'RIGHT':
            return (faceDirection + 1) % numOfDirection;
        default:
            return faceDirection;
    }
}

const newHistory = (robot:Robot):string => robot.position.x+','+robot.position.y+','+DIRECTION[robot.faceDirection];

const reducer = (state:State={robot:{position:{x:0,y:0},faceDirection:DIRECTION.NORTH}, map:{width:5,height:5}, reportHistory:[]}, action:Action):State => {
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
    const placePatt =  /^PLACE\s\d+,\d+,(NORTH|EAST|SOUTH|WEST)$/g;

    return commandsString.split('\n').map(commandString=>{
        if(placePatt.test(commandString)){
            const infoArray = commandString.split(' ')[1].split(',');
            const positionX = parseInt(infoArray[0]);
            const positionY = parseInt(infoArray[1]);
            return {type:'PLACE', position:{x:positionX, y:positionY}, faceDirection:DIRECTION[infoArray[2] as keyof typeof DIRECTION]};
        }

        if(commandString === 'MOVE') return {type:'MOVE'};
        if(commandString === 'LEFT') return {type:'LEFT'};
        if(commandString === 'RIGHT') return {type:'RIGHT'};
        if(commandString === 'REPORT') return {type:'REPORT'};
        
        return {type:'UNKNOWN'};
    });
};

export {canPlace, move, rotate, newHistory, reducer, inputCommandsConverter}