import {State, canPlace, move, rotate, newHistory, reducer, inputCommandsConverter} from '../robotCenter';
import deepFreeze from 'deep-freeze';
import Position from '../Position';
import RobotMap from '../RobotMap';
import {DIRECTION as faceDirection, numOfEnumElements} from '../Enumeration'

const createPosition = (position:Array<number>):Position => {
    return {x:position[0],y:position[1]};
};

const createMap = (map:Array<number>):RobotMap =>{
    return {width:map[0], height:map[1]};
};

const createState = (mapSize:Array<number>, 
    position:Array<number>, 
    faceDirection: faceDirection,
    reportHistory:Array<string> = []):State =>{
    return {robot: {position:{x:position[0], y:position[1]},faceDirection},
            map: createMap(mapSize),
            reportHistory:reportHistory}
};

const buildRow = (rowIndex:number,col:number) => [...Array(col).keys()].map(n=>[rowIndex,n]);
const buildMap = (numOfRow:number,numOfCol:number) => [...Array(numOfRow).keys()].map(n=>buildRow(n,numOfCol));

const map = buildMap(5,5);
const mapSize = [5,5];

describe('reducer fucntion',()=>{
    deepFreeze(map);

    describe('Unknow command',()=>{
        it('should return original state',()=>{
            const state = createState(mapSize, map[0][0], faceDirection.NORTH);
            const command1 = {type:'UNKNOW COMMAND',position:createPosition(map[1][1]),faceDirection:faceDirection.SOUTH};
            expect(reducer(state,command1)).toEqual(state);

            const command2 = {type:'Hello robot',position:createPosition(map[1][1]),faceDirection:faceDirection.SOUTH};
            expect(reducer(state,command2)).toEqual(state);
        });
    });

    describe('PLACE command',()=>{
        describe('place inside the map in the same position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = createState(mapSize, map[0][0], faceDirection.NORTH);
                const command = {type:'PLACE',position:createPosition(map[0][0]),faceDirection:faceDirection.NORTH};
                const expectedState = createState(mapSize, map[0][0], faceDirection.NORTH);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });

        describe('place inside the map in the different position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = createState(mapSize, map[0][0], faceDirection.NORTH);
                const command = {type:'PLACE',position:createPosition(map[1][1]),faceDirection:faceDirection.EAST};
                const expectedState = createState(mapSize, map[1][1], faceDirection.EAST);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });

        describe('place outside the map',()=>{
            it('should return the original state',()=>{
                const oldState = createState(mapSize, map[1][2], faceDirection.EAST);
                const command = {type:'PLACE',position:createPosition([6,6]),faceDirection:faceDirection.WEST};
                const expectedState = createState(mapSize, map[1][2], faceDirection.EAST);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });
    });

    describe('MOVE command',()=>{
        const command = {type:'MOVE'};
        describe('can move',()=>{
            it('move to a new position with the same face direction',()=>{
                const state1 = createState(mapSize, map[0][0], faceDirection.NORTH);
                const state2 = createState(mapSize, map[0][1], faceDirection.NORTH);
                expect(reducer(state1,command)).toEqual(state2);

                const state3 = createState(mapSize, map[2][2], faceDirection.EAST);
                const state4 = createState(mapSize, map[3][2], faceDirection.EAST);
                expect(reducer(state3,command)).toEqual(state4);
            });
        });

        describe('cannot move(on the map edge and face to outside)',()=>{
            it('stay in the same position with the same face direction',()=>{
                const state1 = createState(mapSize, map[0][0], faceDirection.WEST);
                expect(reducer(state1,command)).toEqual(state1);

                const state2 = createState(mapSize, map[4][2], faceDirection.EAST);
                expect(reducer(state2,command)).toEqual(state2);
            });
        });
    });

    describe('LEFT command',()=>{
        const command = {type:'LEFT'};
        it('stay in the same position with a new left rotated direction',()=>{
            const state1 = createState(mapSize, map[0][0], faceDirection.NORTH);
            const state2 = createState(mapSize, map[0][0], faceDirection.EAST);
            const state3 = createState(mapSize, map[0][0], faceDirection.SOUTH);
            const state4 = createState(mapSize, map[0][0], faceDirection.WEST);
            
            expect(reducer(state1,command)).toEqual(state4);
            expect(reducer(state2,command)).toEqual(state1);
            expect(reducer(state3,command)).toEqual(state2);
            expect(reducer(state4,command)).toEqual(state3);
        });
    });

    describe('RIGHT command',()=>{
        const command = {type:'RIGHT'};
        it('stay in the same position with a new right rotated direction',()=>{
            const state1 = createState(mapSize, map[0][0], faceDirection.NORTH);
            const state2 = createState(mapSize, map[0][0], faceDirection.EAST);
            const state3 = createState(mapSize, map[0][0], faceDirection.SOUTH);
            const state4 = createState(mapSize, map[0][0], faceDirection.WEST);
            
            expect(reducer(state1,command)).toEqual(state2);
            expect(reducer(state2,command)).toEqual(state3);
            expect(reducer(state3,command)).toEqual(state4);
            expect(reducer(state4,command)).toEqual(state1);
        });
    });

    describe('REPORT command',()=>{
        const command = {type:'REPORT'};
        describe('start with empty reportHistory',()=>{
            it('should record report history when getting REPORT command',()=>{
                const state1 = createState(mapSize, map[2][2], faceDirection.EAST);
                const state2 = createState(mapSize, map[2][2], faceDirection.EAST, ['2,2,EAST']);
                expect(reducer(state1,command)).toEqual(state2);
            });
        });

        describe('start with existing reportHistory',()=>{
            it('should record new report history and keep the old one',()=>{
                const state1 = createState(mapSize, map[2][2], faceDirection.EAST, ['1,1,WEST']);
                const state2 = createState(mapSize, map[2][2], faceDirection.EAST, ['1,1,WEST','2,2,EAST']);
                expect(reducer(state1,command)).toEqual(state2);
            });
        });
    });
});

describe('inputCommandsConverter function',()=>{
    describe('Place command',()=>{
        it('should return an array with a place action',()=>{
            expect(inputCommandsConverter('PLACE 0,0,NORTH')).toEqual([{type:'PLACE',position:createPosition([0,0]),faceDirection:faceDirection.NORTH}]);
        });
    });

    describe('MOVE command',()=>{
        it('should return an array with a move action',()=>{
            expect(inputCommandsConverter('MOVE')).toEqual([{type:'MOVE'}]);
        });
    });

    describe('LEFT command',()=>{
        it('should return an array with a left action',()=>{
            expect(inputCommandsConverter('LEFT')).toEqual([{type:'LEFT'}]);
        });
    });

    describe('RIGHT command',()=>{
        it('should return an array with a right action',()=>{
            expect(inputCommandsConverter('RIGHT')).toEqual([{type:'RIGHT'}]);
        });
    });

    describe('REPORT command',()=>{
        it('should return an array with a report action',()=>{
            expect(inputCommandsConverter('REPORT')).toEqual([{type:'REPORT'}]);
        });
    });

    describe('UNKNOWN command',()=>{
        it('should return an array with a unknown action',()=>{
            expect(inputCommandsConverter('HELLO TOY ROBOT')).toEqual([{type:'UNKNOWN'}]);
        });

        describe('invalid Place command',()=>{
            it('should return an array with a unknown action',()=>{
                expect(inputCommandsConverter('PLACE111,111,NORTH')).toEqual([{type:'UNKNOWN'}]);
                expect(inputCommandsConverter('PLACE 111,11.1,NORTH')).toEqual([{type:'UNKNOWN'}]);
                expect(inputCommandsConverter('PLACE 111,111,NORTH123')).toEqual([{type:'UNKNOWN'}]);
                expect(inputCommandsConverter('PLACE aaa,111,NORTH')).toEqual([{type:'UNKNOWN'}]);
                expect(inputCommandsConverter('PLACE 111,111,SOURTH')).toEqual([{type:'UNKNOWN'}]);
            });
        });
    });

    describe('multiple commands',()=>{
        const commands = 'PLACE 0,0,NORTH\nLEFT\nMOVE\nREPORT\nRIGHT\nMOVEFORWARD\nREPORT\nMOVE\nREPORT\nRIGHT\nBACKWARD\nMOVE\nBACKWARD\nMOVE\nREPORT';
        it('should return an array of converted actions',()=>{
            const expectedActions = [{"type": "PLACE", "faceDirection": faceDirection.NORTH, "position": createPosition([0, 0])},
                                     {"type": "LEFT"},
                                     {"type": "MOVE"},
                                     {"type": "REPORT"},
                                     {"type": "RIGHT"},
                                     {"type": "UNKNOWN"},
                                     {"type": "REPORT"},
                                     {"type": "MOVE"},
                                     {"type": "REPORT"}, 
                                     {"type": "RIGHT"}, 
                                     {"type": "UNKNOWN"}, 
                                     {"type": "MOVE"}, 
                                     {"type": "UNKNOWN"}, 
                                     {"type": "MOVE"}, 
                                     {"type": "REPORT"}];
            expect(inputCommandsConverter(commands)).toEqual(expectedActions);
        });
    });
});

describe('canPlace function', () => {
    deepFreeze(map);
    describe('place inside the map',()=>{
        it('can be placed',()=>{
            expect(canPlace(createPosition(map[0][0]),faceDirection.NORTH, createMap(mapSize))).toBe(true);
        });
    });

    describe('place outside the map',()=>{
        it('cannot be placed',()=>{
            expect(canPlace(createPosition([10,10]),faceDirection.NORTH, createMap(mapSize))).toBe(false);
        });
    });
});

describe('move function', () => {
    deepFreeze(map);

    describe('move in the map',()=>{
        it('move to a new position',()=>{
            const newPosition1 = createPosition(map[0][1]);
            expect(move(createPosition(map[0][0]), faceDirection.NORTH, createMap(mapSize))).toEqual(newPosition1);

            const newPosition2 = createPosition(map[3][2]);
            expect(move(createPosition(map[2][2]), faceDirection.EAST, createMap(mapSize))).toEqual(newPosition2);
        });
    });

    describe('move out of the map',()=>{
        it('stay in the same place',()=>{
            const position1 = createPosition(map[0][0]);
            expect(move(position1, faceDirection.WEST, createMap(mapSize))).toEqual(position1);

            const position2 = createPosition(map[4][2]);
            expect(move(position2, faceDirection.EAST, createMap(mapSize))).toEqual(position2);
        });
    });
});

describe('rotate function', () => {
    describe('rotate left',()=>{
        it('faceDirection should change to left rotate direction',()=>{
            expect(rotate(faceDirection.NORTH, 'LEFT')).toEqual(faceDirection.WEST);
            expect(rotate(faceDirection.EAST, 'LEFT')).toEqual(faceDirection.NORTH);
            expect(rotate(faceDirection.SOUTH, 'LEFT')).toEqual(faceDirection.EAST);
            expect(rotate(faceDirection.WEST, 'LEFT')).toEqual(faceDirection.SOUTH);
        });
    });

    describe('rotate right',()=>{
        it('faceDirection should change to right rotate direction',()=>{
            expect(rotate(faceDirection.NORTH, 'RIGHT')).toEqual(faceDirection.EAST);
            expect(rotate(faceDirection.EAST, 'RIGHT')).toEqual(faceDirection.SOUTH);
            expect(rotate(faceDirection.SOUTH, 'RIGHT')).toEqual(faceDirection.WEST);
            expect(rotate(faceDirection.WEST, 'RIGHT')).toEqual(faceDirection.NORTH);
        });
    });
});

describe('newHistory function', () => {
    deepFreeze(map);
    describe('formalized a new history',()=>{
        it('return the new history',()=>{
            const robot = {position:createPosition(map[2][2]), faceDirection: faceDirection.SOUTH};
            const history = '2,2,SOUTH';
            expect(newHistory(robot)).toEqual(history);
        });
    });  
});

describe('the number of enumerated direction elements', () => {
    it('return the number of enumerated direction elements ',()=>{
        expect(numOfEnumElements(faceDirection)).toEqual(4);
    });
  
});

