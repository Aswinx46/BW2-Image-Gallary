export interface IbaseRepositoryInterface<T> {
    create(data: T): Promise<T>
    findById(id: string): Promise<T | null>
    delete(id: string): Promise<T | null>
}