import { Document, model, ObjectId } from "mongoose";
import { UserType } from "../../../domain/entities/userEntity";
import { userSchema } from "../schema/userSchema";

export type UserDocument = Document & UserType;

export interface IuserModel extends Omit<UserType, '_id'>, Document {
    _id: ObjectId
}

export const UserModel = model<UserType>('users', userSchema)