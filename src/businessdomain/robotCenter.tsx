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

const place = (state:State, action:Action):State => {
    if(action.position === undefined 
        || action.faceDirection === undefined
        || action.position.x < 0
        || action.position.x >= state.map.width
        || action.position.y < 0
        || action.position.y >= state.map.height) 
            return state;

        return {...state, robot:new Robot(new Position(action.position.x,action.position.y), action.faceDirection) };
}

const move = (state:State):State =>{
    if(state.robot.faceDirection === 'NORTH' && state.robot.position.y + 1 < state.map.height)
        return {...state, robot:new Robot(new Position(state.robot.position.x, state.robot.position.y+1), state.robot.faceDirection) };
    if(state.robot.faceDirection === 'SOUTH' && state.robot.position.y - 1 >= 0)
        return {...state, robot:new Robot(new Position(state.robot.position.x, state.robot.position.y-1), state.robot.faceDirection) };
    if(state.robot.faceDirection === 'EAST' && state.robot.position.x + 1 < state.map.width)
        return {...state, robot:new Robot(new Position(state.robot.position.x+1, state.robot.position.y), state.robot.faceDirection) };
    if(state.robot.faceDirection === 'WEST' && state.robot.position.x - 1 >= 0)
        return {...state, robot:new Robot(new Position(state.robot.position.x -1, state.robot.position.y), state.robot.faceDirection) };
    return state;
}

const rotate = (state:State, action:Action):State => {
    const directionIndex:number = DIRECTION.indexOf(state.robot.faceDirection);
    switch(action.type){
        case 'LEFT':
            return {...state, robot:new Robot(state.robot.position, DIRECTION[(directionIndex - 1 + DIRECTION.length) % DIRECTION.length ]) };
        case 'RIGHT':
            return {...state, robot:new Robot(state.robot.position, DIRECTION[(directionIndex + 1) % DIRECTION.length ]) };
        default:
            return state;
    }
}

const report = (state:State):State => {
    const newHistory = state.robot.position.x+','+state.robot.position.y+','+state.robot.faceDirection;
    return {...state, reportHistory:[...state.reportHistory, newHistory]};
}

const DIRECTION = ['NORTH','EAST','SOUTH','WEST'];

const reducer = (state:State={robot:new Robot(new Position(0,0),'NORTH'), map:new RobotMap(5,5), reportHistory:[]}, action:Action):State => {
    deepFreeze(state);
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
            return {type:'PLACE', position:new Position(positionX,positionY), faceDirection:infoArray[2]};
        }

        if(commandString === 'MOVE') return {type:'MOVE'};
        if(commandString === 'LEFT') return {type:'LEFT'};
        if(commandString === 'RIGHT') return {type:'RIGHT'};
        if(commandString === 'REPORT') return {type:'REPORT'};
        
        return {type:'UNKNOWN'};
    });
};

export {reducer,inputCommandsConverter}