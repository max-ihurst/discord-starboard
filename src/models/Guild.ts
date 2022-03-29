import { Schema, model } from 'mongoose'
import { Guild } from '../types/types'
import * as Constants from '../Constants';

export default model<Guild>('Guild', 
    new Schema<Guild>({
        guild: {
            type: String,
            required: true
        },
        board: {
            type: String,
        },
        limit: {
            type: Number,
            default: Constants.LIMIT
        }
    })
)