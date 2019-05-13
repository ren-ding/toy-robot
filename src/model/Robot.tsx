import Position from './Position'
import {DIRECTION} from './Enumeration'

export default interface Robot {
    position: Position;
    faceDirection: DIRECTION;
}