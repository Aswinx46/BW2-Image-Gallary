import { Request, Response } from "express";
import { IverifyOtpUseCase } from "../../../domain/interface/useCaseInterface/user/verifyOtpUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../domain/entities/errorMessages";

export class VerifyOtpController {
    private verifyOtpUseCase: IverifyOtpUseCase
    constructor(verifyOtpUseCase: IverifyOtpUseCase) {
        this.verifyOtpUseCase = verifyOtpUseCase
    }
    async handleVerifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body
            await this.verifyOtpUseCase.verifyOtp(email, otp)
            res.status(HttpStatus.OK).json({
                message: "Account created Please Login"
            })
        } catch (error) {
            console.log('error while verifying otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'error while verifying otp'
            })
        }
    }
}