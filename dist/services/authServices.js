"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutServices = exports.generateTokenServices = exports.createTokensSevices = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let refreshTokens = [];
let createTokensSevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username } = req.body;
        const user = yield User_1.default.findOne({ where: { username }, paranoid: false });
        const roleResult = yield ((_a = user === null || user === void 0 ? void 0 : user.dataValues) === null || _a === void 0 ? void 0 : _a.role);
        const tokenData = { role: roleResult, username: username };
        const accessToken = generateAccessToken(tokenData);
        const refreshToken = generateRefreshToken(tokenData);
        if (refreshTokens.length !== 0) {
            refreshTokens.map((data) => __awaiter(void 0, void 0, void 0, function* () {
                return yield jsonwebtoken_1.default.verify(data, process.env.REFRESH_TOKEN_KEY || '', (err, data2) => {
                    var _a;
                    if (((_a = data2 === null || data2 === void 0 ? void 0 : data2.compareResult) === null || _a === void 0 ? void 0 : _a.username) === username) {
                        refreshTokens = refreshTokens.filter(tokens => tokens !== data);
                    }
                });
            }));
        }
        refreshTokens.push(refreshToken);
        return ({ accessToken: accessToken, refreshToken: refreshToken });
    }
    catch (e) {
        console.log('e', e);
        throw e;
    }
});
exports.createTokensSevices = createTokensSevices;
let generateTokenServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshtoken } = req.body;
        if (!refreshTokens.includes(refreshtoken)) {
            throw new Error('UNAUTHORIZE - refreshtoken gecersiz yada suresi bitmis.');
        }
        else {
            return jsonwebtoken_1.default.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY || '', (err, data) => {
                if (err) {
                    throw new Error('UNAUTHORIZE - cozumleme problemi.');
                }
                const accessToken = generateAccessToken(data.compareResult);
                return ({ accessToken: accessToken });
            });
        }
    }
    catch (e) {
        console.log('e', e);
        throw e;
    }
});
exports.generateTokenServices = generateTokenServices;
let logoutServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        let count = 0;
        refreshTokens.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.verify(data, process.env.REFRESH_TOKEN_KEY || '', (err, data2) => {
                var _a;
                if (((_a = data2 === null || data2 === void 0 ? void 0 : data2.compareResult) === null || _a === void 0 ? void 0 : _a.username) === username) {
                    refreshTokens = refreshTokens.filter(tokens => tokens !== data);
                    count++;
                }
            });
        }));
        if (count === 0) {
            throw new Error('Zaten cikmis gibi gozukuyorsunuz.');
        }
        return true;
    }
    catch (e) {
        console.log('token Error');
        throw e;
    }
});
exports.logoutServices = logoutServices;
const generateAccessToken = (user) => {
    const payload = { compareResult: user };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_KEY || '', { expiresIn: process.env.ACCESS_TOKEN_TIME });
    return accessToken;
};
const generateRefreshToken = (user) => {
    const payload = { compareResult: user };
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_KEY || '', { expiresIn: process.env.REFRESH_TOKEN_TIME });
    return refreshToken;
};
