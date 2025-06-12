import { NextFunction, Request, Response } from "express";
import { IjwtService } from "../../domain/interface/serviceInterface/jwtServiceInterface";
import { HttpStatus } from "../../domain/entities/statusCode";

export const tokenValidationMiddleware = (JwtService: IjwtService) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Access Denied. No token provided' })
            return
        }
        const token = authHeader.split(' ')[1]
        const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY as string
        try {
            const decoded = JwtService.verifyAccessToken(token, ACCESSTOKEN_SECRET_KEY);
            console.log(decoded)
            if (!decoded || decoded.exp <= 0) {
                res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ message: "Invalid or expired token." });
                return
            }
            (req as any).user = decoded
            next()
        } catch (error) {
            res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: "Invalid or expired token." });
        }
    }
}