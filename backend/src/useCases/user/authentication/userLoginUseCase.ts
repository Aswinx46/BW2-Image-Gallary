import { UserType } from "../../../domain/entities/userEntity";
import { IUserRepostoryInterface } from "../../../domain/interface/repositoryInterface/userRepositoryInterface";
import { IhashPassword } from "../../../domain/interface/serviceInterface/IhashPasswordInterface";
import { IloginUserUseCase } from "../../../domain/interface/useCaseInterface/user/authentication/loginUserUseCaseInterface";

export class UserLoginUseCase implements IloginUserUseCase {
    private userDatabase: IUserRepostoryInterface
    private hashPassword: IhashPassword
    constructor(userDatabase: IUserRepostoryInterface, hashPassword: IhashPassword) {
        this.userDatabase = userDatabase
        this.hashPassword = hashPassword
    }
    async login(email: string, password: string): Promise<UserType> {
        const user = await this.userDatabase.findByEmail(email)
        if (!user) throw new Error('No user Found in this email')
        const comparePassword = await this.hashPassword.comparePassword(password, user.password)
        if (!comparePassword) throw new Error("Inavlid Password")
        return user
    }
}