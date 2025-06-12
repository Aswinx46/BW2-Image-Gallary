import { Request, Response } from "express";
import { IimageUploadingUseCase } from "../../../../domain/interface/useCaseInterface/user/imageUploading/imageUploadingUsecaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class ImageUploadingController {
    private imageUploadingUseCase: IimageUploadingUseCase
    constructor(imageUploadingUseCase: IimageUploadingUseCase) {
        this.imageUploadingUseCase = imageUploadingUseCase
    }
    async handleImageUpload(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body
            await this.imageUploadingUseCase.uploadImage(data)
            res.status(HttpStatus.CREATED).json({ message: 'Image Uploaded' })
        } catch (error) {
            console.log('error while uploading image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while uploading image'
            })
        }
    }
}