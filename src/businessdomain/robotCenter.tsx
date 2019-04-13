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
    return state;
}