import { Request, Response } from "express";
import { IdeleteImageUseCase } from "../../../../domain/interface/useCaseInterface/user/imageUploading/deleteImageUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class DeleteImageController {
    private deleteImageUseCae: IdeleteImageUseCase
    constructor(deleteImageUseCae: IdeleteImageUseCase) {
        this.deleteImageUseCae = deleteImageUseCae
    }
    async handleDelete(req: Request, res: Response): Promise<void> {
        try {
            const { imageUrl } = req.params
            await this.deleteImageUseCae.delete(imageUrl)
            res.status(HttpStatus.OK).json({
                message: "Image Deleted"
            })
        } catch (error) {
            console.log('error while deleting image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while deleting image'
            })
        }
    }
}