namespace Tags.Contracts {
    export interface ITag {
        id?: string;
        description: string;
        days: number[];
        colorRGBA: string;
        lastUsedTicks: number;
    }
}