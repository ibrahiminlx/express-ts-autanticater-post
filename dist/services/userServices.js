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
exports.editPasswordServices = exports.deleteUserServices = exports.editRoleServices = exports.createUserServices = exports.userGetNameServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
let userGetNameServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const json = yield User_1.default.findOne({ where: { username }, paranoid: false });
        return json;
    }
    catch (e) {
        console.log('e', e);
    }
});
exports.userGetNameServices = userGetNameServices;
let createUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        let salt = bcryptjs_1.default.genSaltSync(10);
        let hashPassword = bcryptjs_1.default.hashSync(password, salt);
        const json = yield User_1.default.create({
            username,
            password: hashPassword,
            role
        });
        return json;
    }
    catch (e) {
        console.log('e', e);
    }
});
exports.createUserServices = createUserServices;
let editRoleServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, role } = req.body;
        const json = yield User_1.default.update({
            role
        }, { where: { username } });
        return json;
    }
    catch (e) {
        console.log('e', e);
    }
});
exports.editRoleServices = editRoleServices;
let editPasswordServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldpassword, newpassword, username } = req.body;
        const json = yield User_1.default.update({}, { where: { username } });
        return json;
    }
    catch (e) {
        console.log('e', e);
    }
});
exports.editPasswordServices = editPasswordServices;
let deleteUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const json = yield User_1.default.destroy({ where: { username } });
        return json;
    }
    catch (e) {
        console.log('e', e);
    }
});
exports.deleteUserServices = deleteUserServices;
