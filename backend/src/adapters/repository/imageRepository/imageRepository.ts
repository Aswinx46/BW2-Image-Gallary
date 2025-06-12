import { ImageType } from "../../../domain/entities/imageType";
import { IimageRepositoryInterface } from "../../../domain/interface/repositoryInterface/imageRepositoryInterface";
import { imageModel } from "../../../framework/database/models/imageModel";
import { BaseRepository } from "../baseRepository/baseRepository";

export class ImageRepository extends BaseRepository<ImageType> implements IimageRepositoryInterface {
    constructor() {
        super(imageModel)
    }
    async changeOrder(userId: string, orders: { _id: string; order: number; }[]): Promise<boolean> {

        const bulkOps = orders.map(({ _id, order }) => ({
            updateOne: {
                filter: { _id, userId: userId }, // ensures only that user's image is updated
                update: { $set: { order } }
            }
        }));
        await imageModel.bulkWrite(bulkOps);
        return true
    }
    async findImagesOfAUser(userId: string): Promise<ImageType[] | []> {
        return await imageModel.find({ userId: userId })
    }
    async uploadImage(data: ImageType[]): Promise<ImageType[]> {
        const savedImages = await imageModel.insertMany(data);
        return savedImages
    }
}