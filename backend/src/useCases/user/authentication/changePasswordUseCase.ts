import { IchangePasswordUseCase } from "../../../domain/interface/repositoryInterface/changePasswordUseCaseInterface";
import { IUserRepostoryInterface } from "../../../domain/interface/repositoryInterface/userRepositoryInterface";
import { IhashPassword } from "../../../domain/interface/serviceInterface/IhashPasswordInterface";

export class ChangePasswordUseCase implements IchangePasswordUseCase {
    private userRepository: IUserRepostoryInterface
    private hashPassword: IhashPassword
    constructor(userRepository: IUserRepostoryInterface, hashPassword: IhashPassword) {
        this.userRepository = userRepository
        this.hashPassword = hashPassword
    }
    async changePassword(id: string, oldPassword: string, newPassword: string): Promise<boolean> {
        const user = await this.userRepository.findById(id)
        if (!user) throw new Error("No user Found in this ID")
        const checkingCurrentPassword = await this.hashPassword.comparePassword(oldPassword, user.password)
        if (!checkingCurrentPassword) throw new Error("Current Password is wrong")
        const checkingSamePassword = await this.hashPassword.comparePassword(newPassword, user.password)
        if (checkingSamePassword) throw new Error("New Password cant be same as the old one")
        const newHashedPassword = await this.hashPassword.hashPassword(newPassword)
        await this.userRepository.changePassword(id, newHashedPassword)
        return true
    }
}