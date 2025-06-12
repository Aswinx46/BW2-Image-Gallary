import { Request, Response } from "express";
import { IjwtService } from "../../../../domain/interface/serviceInterface/jwtServiceInterface";
import { HttpStatus } from "../../../../domain/entities/statusCode";
import { ERROR_MESSAGES } from "../../../../domain/entities/errorMessages";

export class RefreshTokenController {
    private jwtService: IjwtService
    constructor(jwtService: IjwtService) {
        this.jwtService = jwtService
    }
    async handleRefreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "No refreshToken found" })
                return
            }
            const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string

            const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESHTOKEN_SECRET_KEY as string;

            const decoded = this.jwtService.verifyRefreshToken(refreshToken, REFRESH_TOKEN_SECRET_KEY)

            if (!decoded || !decoded.userId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired refresh token" });
                return;
            }
            const newAccessToken = this.jwtService.createAccessToken(ACCESSTOKEN_SECRET_KEY, decoded.userId)
            res.status(HttpStatus.OK).json({ message: 'New Access Token Created', newAccessToken })

        } catch (error) {
            console.log('error while setting refresh token', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: ERROR_MESSAGES.BAD_REQUEST,
                error: error instanceof Error ? error.message : 'error while setting refresh token'
            })
        }
    }
}