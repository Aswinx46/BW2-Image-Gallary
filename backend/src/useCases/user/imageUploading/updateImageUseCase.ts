import { ImageType } from "../../../domain/entities/imageType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IupdateImageUseCaseInterface } from "../../../domain/interface/useCaseInterface/user/imageUploading/updateImageUseCaseInterface";

export class UpdateImageUseCase implements IupdateImageUseCaseInterface {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async updateImage(imageId: string, newImageUrl: string): Promise<ImageType> {
        const updatedImage = await this.imageDatabase.updateImage(imageId, newImageUrl)
        if (!updatedImage) throw new Error("NO image found in this ID")
        return updatedImage
    }
}