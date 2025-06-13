import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IdeleteImageUseCase } from "../../../domain/interface/useCaseInterface/user/imageUploading/deleteImageUseCaseInterface";

export class DeleteImageUseCase implements IdeleteImageUseCase {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async delete(imageId: string): Promise<boolean> {
        const deleted = await this.imageDatabase.delete(imageId)
        if (!deleted) throw new Error('No image found in this ID')
        return true
    }
}