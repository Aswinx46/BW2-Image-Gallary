import { ImageType } from "../../../domain/entities/imageType";
import { ImageUpdateOrderType } from "../../../domain/entities/updateImageOrderType";
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

    async updateImageOrder(images: ImageUpdateOrderType[]): Promise<boolean> {
        const bulkOps = images.map((img: { _id: string; imageOrder: number }) => ({
            updateOne: {
                filter: { _id: img._id },
                update: { imageOrder: img.imageOrder }
            }
        }));
        await imageModel.bulkWrite(bulkOps);
        return true
    }
    async updateImage(imageId: string, newImageUrl: string): Promise<ImageType | null> {
        return await imageModel.findByIdAndUpdate(imageId, { imageUrl: newImageUrl }, { new: true })
    }
    async updateImageTitle(imageId: string, newTitle: string): Promise<ImageType | null> {
        return await imageModel.findByIdAndUpdate(imageId, { title: newTitle }, { new: true })
    }
}