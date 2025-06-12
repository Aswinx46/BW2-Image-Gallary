import { isAxiosError } from "axios";
import axios from '../axios/userAxios'
import type { UserRegisterType } from "@/types/userRegisterType";

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