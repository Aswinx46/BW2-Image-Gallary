import { Request, Response } from "express";

import { HttpStatus } from "../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../domain/entities/errorMessages";
import { IuserSignupUseCase } from "../../../domain/interface/useCaseInterface/user/authentication/userSignupUseCaseInterface";

export class SignUpController {
    private signupUseCase: IuserSignupUseCase
    constructor(signupUseCase: IuserSignupUseCase) {
        this.signupUseCase = signupUseCase
    }
    async handleSignUp(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            await this.signupUseCase.signup(email, password)
            res.status(HttpStatus.CREATED).json({
                message: "Account Created"
            })
        } catch (error) {
            console.log('error while creating user', error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error instanceof Error ? error.message : 'error while creating user'
            })
        }
    }
}