import { decodedTokenEntity } from "../../domain/entities/tokenDecodeType";
import { IjwtService } from "../../domain/interface/serviceInterface/jwtServiceInterface";
import jwt from 'jsonwebtoken'
export class JwtService implements IjwtService {
    createAccessToken(accessSecretkey: string, userId: string): string {
        return jwt.sign({ userId }, accessSecretkey, { expiresIn: "15m" })
    }
    createRefreshToken(refreshSercretKey: string, userId: string): string {
        return jwt.sign({ userId }, refreshSercretKey, { expiresIn: "1d" })
    }
    tokenDecode(accessToken: string): decodedTokenEntity | null {
        return jwt.decode(accessToken) as decodedTokenEntity
    }
    verifyAccessToken(accessToken: string, accessSecretKey: string): { userId: string } | null {
        try {
            return jwt.verify(accessToken, accessSecretKey) as { userId: string }
        } catch (error) {
            console.log('error while verifying access token', error)
            return null
        }
    }
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string): { userId: string; } | null {
        try {
            return jwt.verify(refreshToken, refreshSecretKey) as { userId: string }
        } catch (error) {
            console.log('error while verifying refresh token', error)
            return null
        }
    }
}