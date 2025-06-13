import { Request, Response } from "express";
import { IupdateImageOrderUseCase } from "../../../../domain/interface/useCaseInterface/user/imageUploading/updateImageOrderUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class UpdateImageOrderController {
    private updateImageOrderUseCase: IupdateImageOrderUseCase
    constructor(updateImageOrderUseCase: IupdateImageOrderUseCase) {
        this.updateImageOrderUseCase = updateImageOrderUseCase
    }
    async handleChangeOrder(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body
            await this.updateImageOrderUseCase.changeOrder(data)
            res.status(HttpStatus.OK).json({
                message: "Order Changed"
            })
        } catch (error) {
            console.log('error while changing the image order', error)
            res.status(HttpStatus.OK).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while changing the image order'
            })
        }
    }
}