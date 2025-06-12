import { IotpService } from "../../../domain/interface/serviceInterface/otpServiceInterface"
import { IverifyOtpUseCase } from "../../../domain/interface/useCaseInterface/user/authentication/verifyOtpUseCaseInterface"


export class VerifyOtpUseCase implements IverifyOtpUseCase {
    private otpService: IotpService
    constructor(otpService: IotpService) {
        this.otpService = otpService
    }
    async verifyOtp(email: string, otp: string): Promise<void> {
        const verifyOtp = await this.otpService.verifyOtp(email, otp)
        if (!verifyOtp) throw new Error('Invalid OTP')
    }
}