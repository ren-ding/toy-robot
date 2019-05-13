export enum DIRECTION {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
};

export const numOfEnumElements = (e:object) => {
    let count = 0;
    Object.keys(e).forEach((val) => {
        if (Number(isNaN(Number(val)))) {
            count++;
        }
    });
    return count;
};