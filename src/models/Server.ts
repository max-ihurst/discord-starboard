import { Schema, model } from 'mongoose';
import { Server } from '../types/types';
import * as Constants from '../Constants';

export default model<Server>(
    'Server',
    new Schema<Server>({
        id: {
            type: String,
            required: true,
        },
        board: {
            type: String,
        },
        limit: {
            type: Number,
            default: Constants.LIMIT,
        },
        self: {
            type: Boolean,
            default: false,
        },
    })
);
