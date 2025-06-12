export interface IverifyOtpUseCase {
    verifyOtp(email: string, otp: string): Promise<void>
}