import { ImageType } from "../../../../entities/imageType";

export interface IimageUploadingUseCase {
    uploadImage(data: ImageType): Promise<void>
}