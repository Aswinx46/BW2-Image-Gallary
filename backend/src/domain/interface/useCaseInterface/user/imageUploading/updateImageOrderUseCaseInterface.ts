import { ImageUpdateOrderType } from "../../../../entities/updateImageOrderType";

export interface IupdateImageOrderUseCase {
    changeOrder(data: ImageUpdateOrderType[]): Promise<boolean>
}