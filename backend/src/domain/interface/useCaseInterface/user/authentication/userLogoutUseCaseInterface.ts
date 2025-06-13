export interface IuserLogoutUseCase {
    logout(token: string): Promise<boolean>
}