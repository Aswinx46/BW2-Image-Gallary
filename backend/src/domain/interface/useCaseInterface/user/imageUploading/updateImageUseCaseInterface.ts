import { ImageType } from "../../../../entities/imageType";

export interface IupdateImageUseCaseInterface {
    updateImage(imageId: string, newImageUrl: string): Promise<ImageType>
}