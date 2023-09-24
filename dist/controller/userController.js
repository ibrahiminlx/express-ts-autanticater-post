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
exports.editPasswordController = exports.deleteUserController = exports.editRoleController = exports.createUserController = exports.userGetNameController = void 0;
const userServices_1 = require("../services/userServices");
const baseResponse_1 = __importDefault(require("../dto/baseResponse"));
let userGetNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield (0, userServices_1.userGetNameServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
exports.userGetNameController = userGetNameController;
let createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield (0, userServices_1.createUserServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
exports.createUserController = createUserController;
let editRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield (0, userServices_1.editRoleServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
exports.editRoleController = editRoleController;
let editPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield (0, userServices_1.editPasswordServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
exports.editPasswordController = editPasswordController;
let deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield (0, userServices_1.deleteUserServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
exports.deleteUserController = deleteUserController;
