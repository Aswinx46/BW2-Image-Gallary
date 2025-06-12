import { isAxiosError } from "axios";
import axios from '../axios/userAxios'
import type { UserRegisterType } from "@/types/userRegisterType";
import cloudAxios from 'axios'
import type { ImageType } from "@/types/imageType";
export const userSignup = async (user: UserRegisterType) => {
    try {
        const response = await axios.post('/signUp', { email: user.email, password: user.password })
        return response.data
    } catch (error) {
        console.log('error while creating user', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while creating user')
    }
}


export const userSendOtp = async (email: string) => {
    try {
        const response = await axios.post('/sendOtp', { email })
        return response.data
    } catch (error) {
        console.log('error while sending otp', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : "error while sending otp")
    }
}

export const userVerifyOtp = async (email: string, otp: string) => {
    try {
        const response = await axios.post('/verifyOtp', { email, otp })
        return response.data
    } catch (error) {
        console.log('error while verifying otp', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : "error while verifying otp")
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post('/login', { email, password })
        return response.data
    } catch (error) {
        console.log('error while login user', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while user login')
    }
}

export const uploadImageCloudinary = async (formdata: FormData) => {
    try {
        const response = await cloudAxios.post(import.meta.env.VITE_API_CLOUDINARY_URL_IMAGE, formdata)
        return response.data
    } catch (error) {
        console.log('error while uploding image', error)
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        }
        throw 'error while uploading image'
    }
}

export const uploadImageToTheDB = async (data: ImageType) => {
    try {
        const response = await axios.post('/upload', { data })
        return response.data
    } catch (error) {
        console.log('error while creating image in the db', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while creating image in the db')
    }
}

export const fetchImages = async () => {
    try {
        const response = await axios.get('/images')
        return response.data
    } catch (error) {
        console.log('error while fetching imgaes', error)
        throw new Error(isAxiosError(error) ? error.response?.data.error : 'error while fetching images')
    }
}

