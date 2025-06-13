import { ImageUpdateOrderType } from "../../../domain/entities/updateImageOrderType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IupdateImageOrderUseCase } from "../../../domain/interface/useCaseInterface/user/imageUploading/updateImageOrderUseCaseInterface";

export class UpdateImageOrderUseCase implements IupdateImageOrderUseCase {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async changeOrder(data: ImageUpdateOrderType[]): Promise<boolean> {
        await this.imageDatabase.updateImageOrder(data)
        return true
    }
}