import { UserType } from "../../../../entities/userEntity";

export interface IloginUserUseCase {
    login(email: string, password: string): Promise<UserType>
}