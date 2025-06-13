import { ImageType } from "../../../domain/entities/imageType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IupdateTitleUseCase } from "../../../domain/interface/useCaseInterface/user/imageUploading/updateTitleUseCaseInterface";

export class updateTitleUseCase implements IupdateTitleUseCase {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async update(imageId: string, newTitle: string): Promise<ImageType> {
        const updatedImage = await this.imageDatabase.updateImageTitle(imageId, newTitle)
        if (!updatedImage) throw new Error("No image found in this ID")
        return updatedImage
    }
}