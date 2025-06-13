import { Request, Response, Router } from "express";
import { injectedFindImagesController, injectedImageUploadController, injectedRefreshTokenController, injectedSendOtpController, injectedSignupController, InjectedtokenValidationMiddleware, injectedUpdateImageController, injectedUpdateTiteController, injectedUserLoginController, injectedVerifyOtpController } from "../DI/userInjection";

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
        this.userRouter.post('/upload', InjectedtokenValidationMiddleware, (req: Request, res: Response) => {
            injectedImageUploadController.handleImageUpload(req, res)
        })
        this.userRouter.get('/images', InjectedtokenValidationMiddleware, (req: Request, res: Response) => {
            injectedFindImagesController.handleFindImages(req, res)
        })
        this.userRouter.post('/refresh', (req: Request, res: Response) => {
            injectedRefreshTokenController.handleRefreshToken(req, res)
        })
        this.userRouter.patch('/updateTitle', InjectedtokenValidationMiddleware, (req: Request, res: Response) => {
            injectedUpdateTiteController.handleUpdateTite(req, res)
        })
        this.userRouter.patch('/updateImage', (req: Request, res: Response) => {
            injectedUpdateImageController.handleUpdateImag(req, res)
        })
    }
}