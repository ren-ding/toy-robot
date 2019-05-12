import {State, reducer, inputCommandsConverter} from '../robotCenter';
import Robot from '../Robot';
import RobotMap from '../RobotMap';
import deepFreeze from 'deep-freeze';
import Position from '../Position';

const createState = (mapSize:Array<number>, 
    position:Array<number>, 
    faceDirection:string,
    reportHistory:Array<string> = []):State =>{
return {robot: new Robot(new Position(position[0],position[1]),faceDirection),
map: new RobotMap(mapSize[0],mapSize[1]),
reportHistory:reportHistory}
}

const createPosition = (position:Array<number>):Position => {
return new Position(position[0],position[1]);
}

describe('robot center reducer fucntion',()=>{
    const buildRow = (rowIndex:number,col:number) => [...Array(col).keys()].map(n=>[rowIndex,n]);
    const buildMap = (numOfRow:number,numOfCol:number) => [...Array(numOfRow).keys()].map(n=>buildRow(n,numOfCol));

    const map = buildMap(5,5);
    const mapSize = [5,5];

    deepFreeze(map);
    const faceDirection = ['NORTH','EAST','SOUTH','WEST'];

    

    describe('Unknow command',()=>{
        it('should return original state',()=>{
            const state = createState(mapSize, map[0][0], faceDirection[0]);
            const command1 = {type:'UNKNOW COMMAND',position:createPosition(map[1][1]),faceDirection:faceDirection[2]};
            expect(reducer(state,command1)).toEqual(state);

            const command2 = {type:'Hello robot',position:createPosition(map[1][1]),faceDirection:faceDirection[2]};
            expect(reducer(state,command2)).toEqual(state);
        });
    });

    describe('PLACE command',()=>{
        describe('place inside the map in the same position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = createState(mapSize, map[0][0], faceDirection[0]);
                const command = {type:'PLACE',position:createPosition(map[0][0]),faceDirection:faceDirection[0]};
                const expectedState = createState(mapSize, map[0][0], faceDirection[0]);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });

        describe('place inside the map in the different position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = createState(mapSize, map[0][0], faceDirection[0]);
                const command = {type:'PLACE',position:createPosition(map[1][1]),faceDirection:faceDirection[1]};
                const expectedState = createState(mapSize, map[1][1], faceDirection[1]);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });

        describe('place outside the map',()=>{
            it('should return the original state',()=>{
                const oldState = createState(mapSize, map[1][2], faceDirection[1]);
                const command = {type:'PLACE',position:createPosition([6,6]),faceDirection:faceDirection[3]};
                const expectedState = createState(mapSize, map[1][2], faceDirection[1]);
                expect(reducer(oldState,command)).toEqual(expectedState);
            });
        });
    });

    describe('MOVE command',()=>{
        const command = {type:'MOVE'};
        describe('can move',()=>{
            it('move to a new position with the same face direction',()=>{
                const state1 = createState(mapSize, map[0][0], faceDirection[0]);
                const state2 = createState(mapSize, map[0][1], faceDirection[0]);
                expect(reducer(state1,command)).toEqual(state2);

                const state3 = createState(mapSize, map[2][2], faceDirection[1]);
                const state4 = createState(mapSize, map[3][2], faceDirection[1]);
                expect(reducer(state3,command)).toEqual(state4);
            });
        });

        describe('cannot move(on the map edge and face to outside)',()=>{
            it('stay in the same position with the same face direction',()=>{
                const state1 = createState(mapSize, map[0][0], faceDirection[3]);
                expect(reducer(state1,command)).toEqual(state1);

                const state2 = createState(mapSize, map[4][2], faceDirection[1]);
                expect(reducer(state2,command)).toEqual(state2);
            });
        });
    });

    describe('LEFT command',()=>{
        const command = {type:'LEFT'};
        it('stay in the same position with a new left rotated direction',()=>{
            const state1 = createState(mapSize, map[0][0], faceDirection[0]);
            const state2 = createState(mapSize, map[0][0], faceDirection[1]);
            const state3 = createState(mapSize, map[0][0], faceDirection[2]);
            const state4 = createState(mapSize, map[0][0], faceDirection[3]);
            
            expect(reducer(state1,command)).toEqual(state4);
            expect(reducer(state2,command)).toEqual(state1);
            expect(reducer(state3,command)).toEqual(state2);
            expect(reducer(state4,command)).toEqual(state3);
        });
    });

    describe('RIGHT command',()=>{
        const command = {type:'RIGHT'};
        it('stay in the same position with a new right rotated direction',()=>{
            const state1 = createState(mapSize, map[0][0], faceDirection[0]);
            const state2 = createState(mapSize, map[0][0], faceDirection[1]);
            const state3 = createState(mapSize, map[0][0], faceDirection[2]);
            const state4 = createState(mapSize, map[0][0], faceDirection[3]);
            
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
                const state1 = createState(mapSize, map[2][2], faceDirection[1]);
                const state2 = createState(mapSize, map[2][2], faceDirection[1], ['2,2,'+faceDirection[1]]);
                expect(reducer(state1,command)).toEqual(state2);
            });
        });

        describe('start with existing reportHistory',()=>{
            it('should record new report history and keep the old one',()=>{
                const state1 = createState(mapSize, map[2][2], faceDirection[1], ['1,1,WEST']);
                const state2 = createState(mapSize, map[2][2], faceDirection[1], ['1,1,WEST','2,2,'+faceDirection[1]]);
                expect(reducer(state1,command)).toEqual(state2);
            });
        });
    });
});

describe('robot center input commands converter function',()=>{
    describe('Place command',()=>{
        it('should return an array with a place action',()=>{
            expect(inputCommandsConverter('PLACE 0,0,NORTH')).toEqual([{type:'PLACE',position:createPosition([0,0]),faceDirection:'NORTH'}]);
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
            const expectedActions = [{"type": "PLACE", "faceDirection": "NORTH", "position": createPosition([0, 0])},
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