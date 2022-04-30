export interface Server {
    id: string;
    board: string;
    limit: number;
    self: boolean;
}

export interface Star {
    id: string;
    guild: string;
    channel: string;
    message: string;
    user: string;
    count: number;
}

export type Settings = 'board' | 'limit' | 'self';
