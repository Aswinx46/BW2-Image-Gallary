import { IUserRepostoryInterface } from "../../../domain/interface/repositoryInterface/userRepositoryInterface";
import { IjwtService } from "../../../domain/interface/serviceInterface/jwtServiceInterface";
import { IuserLogoutUseCase } from "../../../domain/interface/useCaseInterface/user/authentication/userLogoutUseCaseInterface";

export class UserLogoutUseCase implements IuserLogoutUseCase {
    private userDatabase: IUserRepostoryInterface
    private jwtService: IjwtService
    constructor(userDatabase: IUserRepostoryInterface, jwtService: IjwtService) {
        this.userDatabase = userDatabase
        this.jwtService = jwtService
    }
    async logout(token: string): Promise<boolean> {
        const decoded = this.jwtService.tokenDecode(token)
        const exp = decoded?.exp
        if (!exp) throw new Error('Invaid Token')
        return true
    }
}