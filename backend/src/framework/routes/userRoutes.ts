import { Request, Response, Router } from "express";
import { injectedFindImagesController, injectedImageUploadController, injectedSendOtpController, injectedSignupController, injectedUserLoginController, injectedVerifyOtpController } from "../DI/userInjection";

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
        this.userRouter.post('/login', (req: Request, res: Response) => {
            injectedUserLoginController.handleLogin(req, res)
        })
        this.userRouter.post('/upload', (req: Request, res: Response) => {
            injectedImageUploadController.handleImageUpload(req, res)
        })
        this.userRouter.get('/images', (req: Request, res: Response) => {
            injectedFindImagesController.handleFindImages(req, res)
        })
    }
}