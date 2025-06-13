import { ImageType } from "../../../../entities/imageType";

export interface IupdateTitleUseCase {
    update(imageId: string, newTitle: string): Promise<ImageType>
}