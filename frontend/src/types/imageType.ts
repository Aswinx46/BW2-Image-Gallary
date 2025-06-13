

export interface ImageType {
    _id: string,
    imageUrl: string,
    imageOrder: number,
    userId: string ,
    title: string
}

export interface ImageTypeWithoutId {
    imageUrl: string,
    imageOrder: number,
    userId: string ,
    title: string
}