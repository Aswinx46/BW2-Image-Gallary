import { Request, Response } from "express";
import { IupdateImageUseCaseInterface } from "../../../../domain/interface/useCaseInterface/user/imageUploading/updateImageUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class UpdateImageController {
    private updateImageUseCase: IupdateImageUseCaseInterface
    constructor(updateImageUseCase: IupdateImageUseCaseInterface) {
        this.updateImageUseCase = updateImageUseCase
    }
    async handleUpdateImag(req: Request, res: Response): Promise<void> {
        try {
            const { imageId, imageUrl } = req.body
            const updatedImage = await this.updateImageUseCase.updateImage(imageId, imageUrl)
            res.status(HttpStatus.OK).json({ message: "Image updated", updatedImage })
        } catch (error) {
            console.log('error while updating image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while updating image'
            })
        }
    }
}