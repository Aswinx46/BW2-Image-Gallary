import { ObjectId } from "mongoose";

export interface ImageType {
    _id?: string,
    imageUrl: string,
    imageOrder: number,
    userId: string | ObjectId,
    title: string
}