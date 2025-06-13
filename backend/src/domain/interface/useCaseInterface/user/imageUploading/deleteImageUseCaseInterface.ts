export interface IdeleteImageUseCase {
    delete(imageId: string): Promise<boolean>
}