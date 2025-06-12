import { ImageType } from "../../entities/imageType";
import { IbaseRepositoryInterface } from "./baseRepositoryInterface";

export interface IimageRepositoryInterface extends IbaseRepositoryInterface<ImageType> {
    findImagesOfAUser(userId: string): Promise<ImageType[] | []>
    uploadImage(data: ImageType[]): Promise<ImageType[]>
    changeOrder(userId: string, orders: { _id: string; order: number }[]): Promise<boolean>;
}