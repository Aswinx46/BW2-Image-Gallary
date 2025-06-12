import { IUserRepostoryInterface } from "../../../domain/interface/repositoryInterface/userRepositoryInterface"
import { IemailService } from "../../../domain/interface/serviceInterface/emailService"
import { IotpService } from "../../../domain/interface/serviceInterface/otpServiceInterface"
import { IsendOtpUseCase } from "../../../domain/interface/useCaseInterface/user/authentication/sentOtpUseCaseInterface"


export class SendOtpUseCase implements IsendOtpUseCase {
    private otpService: IotpService
    private emailService: IemailService
    private userDatabase: IUserRepostoryInterface
    constructor(otpService: IotpService, emailService: IemailService, userDatabase: IUserRepostoryInterface) {
        this.otpService = otpService
        this.emailService = emailService
        this.userDatabase = userDatabase
    }
    async sendOtp(email: string): Promise<void> {
        const user = await this.userDatabase.findByEmail(email)
        if(user) throw new Error('This email is already exists')
        const generatedOtp = this.otpService.genarateOtp()
        await this.otpService.storeOtp(email, generatedOtp)
        await this.emailService.sendEmailOtp(email, generatedOtp)
    }
}