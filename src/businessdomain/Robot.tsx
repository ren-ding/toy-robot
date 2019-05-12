import Position from './Position'
export default class Robot {
    private _position: Position;
    private _faceDirection: string;

    constructor(position:Position, faceDirection:string){
        this._position = position;
        this._faceDirection = faceDirection;
    }

    get position():Position {
        return this._position
    }

    get faceDirection(): string{
        return this._faceDirection;
    }
}