export interface Guild {
    guild: string;
    board: string;
    limit: number;
}

export interface Star {
    guild: string;
    channel: string;
    primal: string;
    message: string;
    user: string;
    count: number;
}