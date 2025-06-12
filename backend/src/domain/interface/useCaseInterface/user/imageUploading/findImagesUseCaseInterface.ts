import { ImageType } from "../../../../entities/imageType";

export interface IfindImagesOfUserUseCase {
    find(userId: string): Promise<ImageType[]>
}