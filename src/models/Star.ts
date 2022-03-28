import { Schema, model } from 'mongoose'
import { Star } from '../types/types'

export default model<Star>('Star', 
    new Schema<Star>({
        guild: {
            type: String,
            required: true
        },
        channel: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    })
)