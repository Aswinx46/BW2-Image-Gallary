import { ImageType } from "../../../domain/entities/imageType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IimageUploadingUseCase } from "../../../domain/interface/useCaseInterface/user/imageUploading/imageUploadingUsecaseInterface";

export class ImageUploadingUseCase implements IimageUploadingUseCase {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async uploadImage(data: ImageType): Promise<void> {
        await this.imageDatabase.create(data)
    }
}