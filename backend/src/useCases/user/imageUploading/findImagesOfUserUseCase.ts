import { ImageType } from "../../../domain/entities/imageType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { IfindImagesOfUserUseCase } from "../../../domain/interface/useCaseInterface/user/imageUploading/findImagesUseCaseInterface";

export class FindImagesOfUserUseCase implements IfindImagesOfUserUseCase {
    private imageDatabase: IimageRepositoryInterface
    constructor(imageDatabase: IimageRepositoryInterface) {
        this.imageDatabase = imageDatabase
    }
    async find(userId: string): Promise<ImageType[]> {
        return await this.imageDatabase.findImagesOfAUser(userId)
    }
}