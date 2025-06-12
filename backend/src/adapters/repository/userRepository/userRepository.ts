import { UserType } from "../../../domain/entities/userEntity";
import { IUserRepostoryInterface } from "../../../domain/interface/repositoryInterface/userRepositoryInterface";
import { UserModel } from "../../../framework/database/models/userModel";
import { BaseRepository } from "../baseRepository/baseRepository";

export class UserRepository extends BaseRepository<UserType> implements IUserRepostoryInterface {

    constructor() {
        super(UserModel)
    }
    async changePassword(id: string, newPassword: string): Promise<Partial<UserType> | null> {
        return await UserModel.findByIdAndUpdate(id, { password: newPassword }, { new: true })
    }
    async findByEmail(email: string): Promise<UserType | null> {
        return await UserModel.findOne({ email })
    }

}