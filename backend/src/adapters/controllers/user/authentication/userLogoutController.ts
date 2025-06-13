import { Request, Response } from "express";
import { IuserLogoutUseCase } from "../../../../domain/interface/useCaseInterface/user/authentication/userLogoutUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class UserLogoutController {
    private userLogoutUseCase: IuserLogoutUseCase
    constructor(userLogoutUseCase: IuserLogoutUseCase) {
        this.userLogoutUseCase = userLogoutUseCase
    }
    async handleLogout(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Authorization header missing' });
                return;
            }
            const token = authHeader.split(' ')[1];
            await this.userLogoutUseCase.logout(token)
            res.status(HttpStatus.OK).json({ message: "Logout successful" });
        } catch (error) {
            console.log('error while logingout user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while loging out user'
            })
        }
    }
}