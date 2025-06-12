import e, { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";
import { setCookie } from "../../../../framework/services/setCookite";
import { IloginUserUseCase } from "../../../../domain/interface/useCaseInterface/user/authentication/loginUserUseCaseInterface";
import { IjwtService } from "../../../../domain/interface/serviceInterface/jwtServiceInterface";

export class UserLoginController {
    private userLoginUserCase: IloginUserUseCase
    private jwtService: IjwtService
    constructor(userLoginUserCase: IloginUserUseCase, jwtService: IjwtService) {
        this.userLoginUserCase = userLoginUserCase
        this.jwtService = jwtService
    }
    async handleLogin(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            const user = await this.userLoginUserCase.login(email, password)
            if (!user) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: ERROR_MESSAGES.BAD_REQUEST,
                    error: 'Invalid Credentials'
                })
                return
            }
            const accessTokenSecret = process.env.ACCESSTOKEN_SECRET_KEY
            const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET_KEY
            const accessToken = this.jwtService.createAccessToken(accessTokenSecret!, user._id!)
            const refreshToken = this.jwtService.createRefreshToken(refreshTokenSecret!, user._id!)
            setCookie(res, refreshToken)
            res.status(HttpStatus.OK).json({ message: "User Logged", user, accessToken })
        } catch (error) {
            console.log('error while client login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while client login'
            })
        }
    }
}