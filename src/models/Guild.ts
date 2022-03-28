import { Schema, model } from 'mongoose'
import { Guild } from '../types/types'

export default model<Guild>('Guild', 
    new Schema<Guild>({
        guild: {
            type: String,
            required: true
        },
        board: {
            type: String,
            required: true
        }
    })
)