import {reducer} from '../robotCenter'

describe('robot center reducer fucntion',()=>{
    const buildRow = (rowIndex:number,col:number) => [...Array(col).keys()].map(n=>[rowIndex,n]);
    const buildMap = (numOfRow:number,numOfCol:number) => [...Array(numOfRow).keys()].map(n=>buildRow(n,numOfCol));

    const map = buildMap(5,5);
    const faceDirection = ['NORTH','EAST','SOUTH','WEST'];

    describe('Unknow command',()=>{
        it('should return original state',()=>{
            const robot = {position: map[0][0], faceDirection:faceDirection[0]};
            const command1 = {type:'UNKNOW COMMAND',position:map[1][1],faceDirection:faceDirection[2]};
            expect(reducer(robot,command1)).toEqual(robot);

            const command2 = {type:'Hello robot',position:map[1][1],faceDirection:faceDirection[2]};
            expect(reducer(robot,command2)).toEqual(robot);
        });
    });

    describe('PLACE command',()=>{
        describe('place inside the map in the same position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = {position:map[0][0], faceDirection:faceDirection[0]};
                const command = {type:'PLACE',position:map[0][0],faceDirection:faceDirection[0]};
                expect(reducer(oldState,command)).toEqual({position:map[0][0], faceDirection:faceDirection[0]});
            });
        });

        describe('place inside the map in the different position and face direction',()=>{
            it('should return the same position and face direction',()=>{
                const oldState = {position:map[0][0], faceDirection:faceDirection[0]};
                const command = {type:'PLACE',position:map[1][1],faceDirection:faceDirection[1]};
                expect(reducer(oldState,command)).toEqual({position:map[1][1], faceDirection:faceDirection[1]});
            });
        });

        describe('place outside the map',()=>{
            it('should return the original state',()=>{
                const oldState = {position:map[1][2], faceDirection:faceDirection[1]};
                const command = {type:'PLACE',position:[6,6],faceDirection:faceDirection[3]};
                expect(reducer(oldState,command)).toEqual({position:map[1][2], faceDirection:faceDirection[1]});
            });
        });
    });

    describe('MOVE command',()=>{
        const command = {type:'MOVE'};
        describe('can move',()=>{
            it('move to a new position with the same face direction',()=>{
                const state1 = {position:map[0][0], faceDirection:faceDirection[0]};
                const state2 = {position:map[0][1], faceDirection:faceDirection[0]};
                expect(reducer(state1,command)).toEqual(state2);

                const state3 = {position:map[2][2], faceDirection:faceDirection[1]};
                const state4 = {position:map[2][3], faceDirection:faceDirection[1]};
                expect(reducer(state3,command)).toEqual(state4);
            });
        });

        describe('cannot move(on the map edge and face to outside)',()=>{
            it('stay in the same position with the same face direction',()=>{
                const state1 = {position:map[0][0], faceDirection:faceDirection[3]};
                expect(reducer(state1,command)).toEqual(state1);

                const state2 = {position:map[4][2], faceDirection:faceDirection[0]};
                expect(reducer(state2,command)).toEqual(state2);
            });
        });
    });

    describe('LEFT command',()=>{
        const command = {type:'LEFT'};
        it('stay in the same position with a new left rotated direction',()=>{
            const state1 = {position:map[0][0], faceDirection:faceDirection[0]};
            const state2 = {position:map[0][0], faceDirection:faceDirection[1]};
            const state3 = {position:map[0][0], faceDirection:faceDirection[2]};
            const state4 = {position:map[0][0], faceDirection:faceDirection[3]};
            
            expect(reducer(state1,command)).toEqual(state4);
            expect(reducer(state2,command)).toEqual(state1);
            expect(reducer(state3,command)).toEqual(state2);
            expect(reducer(state4,command)).toEqual(state3);
        });
    });

    describe('RIGHT command',()=>{
        const command = {type:'LEFT'};
        it('stay in the same position with a new right rotated direction',()=>{
            const state1 = {position:map[0][0], faceDirection:faceDirection[0]};
            const state2 = {position:map[0][0], faceDirection:faceDirection[1]};
            const state3 = {position:map[0][0], faceDirection:faceDirection[2]};
            const state4 = {position:map[0][0], faceDirection:faceDirection[3]};
            
            expect(reducer(state1,command)).toEqual(state2);
            expect(reducer(state2,command)).toEqual(state3);
            expect(reducer(state3,command)).toEqual(state4);
            expect(reducer(state4,command)).toEqual(state1);
        });
    });

});