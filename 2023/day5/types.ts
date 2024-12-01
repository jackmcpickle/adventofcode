type AlmanacMap = {
    sourceName: string;
    destinationName: string;
    ranges: ParseRange[];
};

type ParseRange = {
    destination: number;
    source: number;
    size: number;
};

type SeedRange = {
    id: number;
    length: number;
};
