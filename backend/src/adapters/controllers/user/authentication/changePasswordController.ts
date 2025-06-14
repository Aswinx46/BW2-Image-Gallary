import { Request, Response } from "express";
import { IchangePasswordUseCase } from "../../../../domain/interface/repositoryInterface/changePasswordUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class ChangePasswordController {
    private changePasswordUseCase: IchangePasswordUseCase
    constructor(changePasswordUseCase: IchangePasswordUseCase) {
        this.changePasswordUseCase = changePasswordUseCase
    }
    async handleChangePassword(req: Request, res: Response): Promise<void> {
        try {
            const { id, oldPassword, newPassword } = req.body
            await this.changePasswordUseCase.changePassword(id, oldPassword, newPassword)
            res.status(HttpStatus.OK).json({
                message: 'Password Changed'
            })
        } catch (error) {
            console.log('error while changing password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while changing the password'
            })
        }
    }
}