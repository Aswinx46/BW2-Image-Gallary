import { Document, Model } from "mongoose";
import { IbaseRepositoryInterface } from "../../../domain/interface/repositoryInterface/baseRepositoryInterface";

export abstract class BaseRepository<T> implements IbaseRepositoryInterface<T> {
    constructor(protected model: Model<T>) { }

    async create(data: T): Promise<T> {
        const doc = await this.model.create(data)
        return doc.toObject() as T
    }

    async delete(id: string): Promise<T | null> {
        const deleted = await this.model.findByIdAndDelete(id)
        return deleted?.toObject() as T
    }
    async findById(id: string): Promise<T | null> {
        const user = await this.model.findById(id)
        return user?.toObject() as T | null
    }
  
}