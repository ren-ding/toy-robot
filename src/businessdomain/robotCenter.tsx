import deepFreeze from 'deep-freeze';

interface Robot {
    position: Array<number>,
    faceDirection: string
}

interface Action {
    type: string,
    position?: Array<number>,
    faceDirection?: string
}

export const reducer = (state:Robot,action:Action) => {
    const mapSize:Array<Number> = [5,5];
    deepFreeze(mapSize);

    const direction = ['NORTH','EAST','SOUTH','WEST'];
    Object.freeze(direction);

    const directionIndex = direction.indexOf(state.faceDirection);
    
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
            return directionIndex - 1 < 0 ? {...state, ...{faceDirection:direction[3]}} : {...state, ...{faceDirection:direction[directionIndex - 1]}};
        case 'RIGHT':
            return directionIndex + 1 >= direction.length ? {...state, ...{faceDirection:direction[0]}} : {...state, ...{faceDirection:direction[directionIndex + 1]}};
        default:
            return state;
    }
}