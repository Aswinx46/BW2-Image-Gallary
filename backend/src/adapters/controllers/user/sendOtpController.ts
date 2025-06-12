import { Request, Response } from "express";
import { IsendOtpUseCase } from "../../../domain/interface/useCaseInterface/user/sentOtpUseCaseInterface";
import { HttpStatus } from "../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../domain/entities/errorMessages";

export class SendOtpController {
    private sendOtpUsecase: IsendOtpUseCase
    constructor(sendOtpUsecase: IsendOtpUseCase) {
        this.sendOtpUsecase = sendOtpUsecase
      
    }
    async handleSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            await this.sendOtpUsecase.sendOtp(email)
            res.status(HttpStatus.OK).json({
                message: "OTP Sended"
            })
        } catch (error) {
            console.log('error while sending OTP', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'error while sending OTP'
            })
        }
    }
}