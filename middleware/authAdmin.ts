import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        res.status(403).json("Token zorunlu bir alan.");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err: any, data: any) => {
            if (err || !data) {
                res.status(403).json('Geçersiz veya süresi dolmuş bir token.');
            } else {
                if (data.compareResult.role === 'admin') {
                    next();
                } else {
                    res.status(403).json('Yetki yetersiz.');
                }
            }
        });
    }
};

export default verifyToken;