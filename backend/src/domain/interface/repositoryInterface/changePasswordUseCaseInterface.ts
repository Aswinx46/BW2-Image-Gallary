export interface IchangePasswordUseCase {
    changePassword(id: string, oldPassword: string, newPassword: string): Promise<boolean>
}