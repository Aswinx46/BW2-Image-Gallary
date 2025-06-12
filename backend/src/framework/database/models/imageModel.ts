import { Document, model, ObjectId } from "mongoose";
import { ImageType } from "../../../domain/entities/imageType";
import { ImageSchema } from "../schema/imageSchema";

export interface IimageSchema extends Omit<ImageType, '_id'>, Document {
    _id: ObjectId
}
export const imageModel = model<ImageType>('images', ImageSchema)