import { ImageType } from "../../entities/imageType";
import { ImageUpdateOrderType } from "../../entities/updateImageOrderType";
import { IbaseRepositoryInterface } from "./baseRepositoryInterface";

export interface IimageRepositoryInterface extends IbaseRepositoryInterface<ImageType> {
    findImagesOfAUser(userId: string): Promise<ImageType[] | []>
    uploadImage(data: ImageType[]): Promise<ImageType[]>
    changeOrder(userId: string, orders: { _id: string; order: number }[]): Promise<boolean>;
    updateImageOrder(images: ImageUpdateOrderType[]): Promise<boolean>
    updateImageTitle(imageId: string, newTitle: string): Promise<ImageType | null>
    updateImage(imageId: string, newImageUrl: string): Promise<ImageType | null>
}