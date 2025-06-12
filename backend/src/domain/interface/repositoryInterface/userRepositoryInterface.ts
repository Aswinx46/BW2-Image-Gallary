import { UserType } from "../../entities/userEntity";
import { IbaseRepositoryInterface } from "./baseRepositoryInterface";

export interface IUserRepostoryInterface extends IbaseRepositoryInterface<UserType> {
    findByEmail(email: string): Promise<UserType | null>
    changePassword(id: string, newPassword: string): Promise<Partial<UserType> | null>
}