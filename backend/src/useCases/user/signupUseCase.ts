import { IUserRepostoryInterface } from "../../domain/interface/repositoryInterface/userRepositoryInterface";
import { IhashPassword } from "../../domain/interface/serviceInterface/IhashPasswordInterface";
import { IuserSignupUseCase } from "../../domain/interface/useCaseInterface/user/userSignupUseCaseInterface";

export class UserSignupUseCase implements IuserSignupUseCase {
    private userRepository: IUserRepostoryInterface
    private hashPassword: IhashPassword
    constructor(userRepository: IUserRepostoryInterface, hashPassword: IhashPassword) {
        this.userRepository = userRepository
        this.hashPassword = hashPassword
    }
    async signup(email: string, password: string): Promise<boolean> {
        console.log(email, password)
        if (!email || !password) throw new Error("Credentials not found")
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) throw new Error('This email is already exits')
        const hashedPassword = await this.hashPassword.hashPassword(password)
        const user = await this.userRepository.create({ email, password: hashedPassword })
        if (!user) throw new Error('Error while creating user')
        return true
    }
}