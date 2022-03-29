export interface Guild {
    guild: string;
    board: string;
    limit: number;
}

export interface Star {
    guild: string;
    channel: string;
    message: string;
    count: number;
}