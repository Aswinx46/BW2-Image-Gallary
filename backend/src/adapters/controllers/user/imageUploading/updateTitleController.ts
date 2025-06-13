import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";
import { IupdateTitleUseCase } from "../../../../domain/interface/useCaseInterface/user/imageUploading/updateTitleUseCaseInterface";

export class UpdateTitleController {
    private updateTitleUseCase: IupdateTitleUseCase
    constructor(updateTitleUseCase: IupdateTitleUseCase) {
        this.updateTitleUseCase = updateTitleUseCase
    }
    async handleUpdateTite(req: Request, res: Response): Promise<void> {
        try {
            const { imageId, newTitle } = req.body
            const updatedImage = await this.updateTitleUseCase.update(imageId, newTitle)
            res.status(HttpStatus.OK).json({
                message: "updated",
                updatedImage
            })
        } catch (error) {
            console.log('error while updating title of the image', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while updating title'
            })
        }
    }
}