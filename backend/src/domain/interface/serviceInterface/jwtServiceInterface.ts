import { decodedTokenEntity } from "../../entities/tokenDecodeType";

export interface IjwtService {
    createAccessToken(accessSecretkey: string, userId: string): string
    createRefreshToken(refreshSercretKey: string, userId: string): string
    verifyAccessToken(accessToken: string, accessSecretKey: string): { userId: string } | null
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string): { userId: string } | null;
    tokenDecode(accessToken: string): decodedTokenEntity | null
}