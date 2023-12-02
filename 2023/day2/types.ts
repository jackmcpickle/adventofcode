export type GameSets = {
    red: number;
    blue: number;
    green: number;
};

export type Game = {
    id: number;
    sets: GameSets[];
};
