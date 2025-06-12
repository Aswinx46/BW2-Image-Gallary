import { Schema } from "mongoose";
import { UserType } from "../../../domain/entities/userEntity";

export const userSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

