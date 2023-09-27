"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(403).json("Token zorunlu bir alan.");
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err, data) => {
            if (err || !data) {
                res.status(403).json('Geçersiz veya süresi dolmuş bir token.');
            }
            else {
                if (data.compareResult.role === 'admin' || data.compareResult.role === 'write' || data.compareResult.role === 'readandwrite') {
                    next();
                }
                else {
                    res.status(403).json('Yetki yetersiz.');
                }
            }
        });
    }
};
exports.default = verifyToken;
