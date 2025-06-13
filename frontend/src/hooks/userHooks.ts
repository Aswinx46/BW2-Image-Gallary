import { deleteImage, fetchImages, updateImage, updateOrder, updateTitle, uploadImageCloudinary, uploadImageToTheDB, userLogin, userLogout, userSendOtp, userSignup, userVerifyOtp } from "@/services/userService"
import type { ImageTypeWithoutId } from "@/types/imageType"
import type { ImageUpdateOrderType } from "@/types/updateOrderType"
import type { UserRegisterType } from "@/types/userRegisterType"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUserSignup = () => {
    return useMutation({
        mutationFn: (user: UserRegisterType) => userSignup(user)
    })
}

export const useUserSendOTp = () => {
    return useMutation({
        mutationFn: (email: string) => userSendOtp(email)
    })
}

export const useUserVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ email, otp }: { email: string, otp: string }) => userVerifyOtp(email, otp)
    })
}

export const useUserLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => userLogin(email, password)
    })
}

export const useUploadImageToCloudinary = () => {
    return useMutation({
        mutationFn: (formdata: FormData) => uploadImageCloudinary(formdata)
    })
}

export const useUploadImageToDB = () => {
    return useMutation({
        mutationFn: (data: ImageTypeWithoutId) => uploadImageToTheDB(data)
    })
}

export const useFetchImages = () => {
    return useQuery({
        queryKey: ['images'],
        queryFn: fetchImages
    })
}

export const useUpdateTitle = () => {
    return useMutation({
        mutationFn: ({ imageId, newTitle }: { imageId: string, newTitle: string }) => updateTitle(imageId, newTitle)
    })
}

export const useUpdateImage = () => {
    return useMutation({
        mutationFn: ({ imageId, imageUrl }: { imageId: string, imageUrl: string }) => updateImage(imageId, imageUrl)
    })
}

export const useChangeImageOrder = () => {
    return useMutation({
        mutationFn: (data: ImageUpdateOrderType[]) => updateOrder(data)
    })
}

export const useDeleteImage = () => {
    return useMutation({
        mutationFn: (imageId: string) => deleteImage(imageId)
    })
}

export const useUserLogout = () => {
    return useMutation({
        mutationFn: userLogout
    })
}