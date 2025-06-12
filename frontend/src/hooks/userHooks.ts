import { userLogin, userSendOtp, userSignup, userVerifyOtp } from "@/services/userService"
import type { UserRegisterType } from "@/types/userRegisterType"
import { useMutation } from "@tanstack/react-query"

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