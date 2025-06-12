import { Schema } from "mongoose";
import { ImageType } from "../../../domain/entities/imageType";

export const ImageSchema = new Schema<ImageType>({
    imageOrder: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},{
    timestamps:true
})