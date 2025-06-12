export interface IsendOtpUseCase {
    sendOtp(email: string): Promise<void>
}