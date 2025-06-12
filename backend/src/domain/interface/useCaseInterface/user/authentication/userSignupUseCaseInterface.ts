export interface IuserSignupUseCase {
    signup(email: string, password: string): Promise<boolean>
}