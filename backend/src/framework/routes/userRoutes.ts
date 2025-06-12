import { Request, Response, Router } from "express";
import { injectedSendOtpController, injectedSignupController, injectedVerifyOtpController } from "../DI/userInjection";

export class UserRoute {
    public userRouter: Router
    constructor() {
        this.userRouter = Router()
        this.setRoute()
    }
    private setRoute() {
        this.userRouter.post('/signup', (req: Request, res: Response) => {
            injectedSignupController.handleSignUp(req, res)
        })
        this.userRouter.post('/sendOtp', (req: Request, res: Response) => {
            injectedSendOtpController.handleSendOtp(req, res)
        })
        this.userRouter.post('/verifyOtp', (req: Request, res: Response) => {
            injectedVerifyOtpController.handleVerifyOtp(req, res)
        })
    }
}