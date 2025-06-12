import { Request, Response } from "express";
import { IfindImagesOfUserUseCase } from "../../../../domain/interface/useCaseInterface/user/imageUploading/findImagesUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class FindImagesOfUserController {
    private findImagesUseCase: IfindImagesOfUserUseCase
    constructor(findImagesUseCase: IfindImagesOfUserUseCase) {
        this.findImagesUseCase = findImagesUseCase
    }
    async handleFindImages(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.userId
            const images = await this.findImagesUseCase.find(userId)
          
            res.status(HttpStatus.OK).json({ messages: "Images fetched", images })
        } catch (error) {
            console.log('error while finding images of user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while finding images'
            })
        }
    }
}