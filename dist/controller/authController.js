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
exports.logoutController = exports.tokenGenerateController = exports.loginController = void 0;
const authServices_1 = require("../services/authServices");
const baseResponse_1 = __importDefault(require("../dto/baseResponse"));
const userValidations_1 = require("./validations/userValidations");
const userServices_1 = require("../services/userServices");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        (0, userValidations_1.userValidations)({ username });
        const data = yield (0, userServices_1.usernameControlServices)(username);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu kullanici sistemde kayitli degildir.');
        }
        else {
            const passwordHashControl = bcryptjs_1.default.compareSync(password, data === null || data === void 0 ? void 0 : data.dataValues.password);
            if (passwordHashControl === true) {
                const json = yield (0, authServices_1.createTokensSevices)(req, res);
                res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
            }
            else {
                throw new Error('Sifre yanlis girildi.');
            }
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.loginController = loginController;
let tokenGenerateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshtoken } = req.body;
        if (refreshtoken === undefined) {
            throw new Error('refreshToken bos olamaz.');
        }
        else {
            const json = yield (0, authServices_1.generateTokenServices)(req, res);
            res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.tokenGenerateController = tokenGenerateController;
let logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const data = yield (0, userServices_1.usernameControlServices)(username);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu kullanici sistemde kayitli degildir.');
        }
        else {
            const json = yield (0, authServices_1.logoutServices)(req, res);
            res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.logoutController = logoutController;
