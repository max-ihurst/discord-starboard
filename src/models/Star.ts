import { Schema, model } from 'mongoose';
import { Star } from '../types/types';

export default model<Star>(
    'Star',
    new Schema<Star>({
        id: {
            type: String,
            required: true,
        },
        guild: {
            type: String,
            required: true,
        },
        channel: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    })
);
