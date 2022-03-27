import { Schema, model } from 'mongoose'
import { Guild } from '../types/types'

export default model<Guild>('Guild', 
    new Schema<Guild>({
        guild: {
            type: String
        },
        board: {
            type: String
        }
    })
)