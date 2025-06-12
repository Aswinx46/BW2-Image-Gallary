import bcrypt from 'bcrypt'
import { IhashPassword } from '../../domain/interface/serviceInterface/IhashPasswordInterface';

export class HashPassword implements IhashPassword {
    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
    public async comparePassword(password: string, passwordInDb: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordInDb)
    }
}