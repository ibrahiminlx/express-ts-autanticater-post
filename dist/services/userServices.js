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
exports.usernameControlServices = exports.editPasswordServices = exports.deleteUserServices = exports.editRoleServices = exports.createUserServices = exports.userGetNameServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const helper_1 = require("../db/helper");
let userGetNameServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const json = yield User_1.default.findOne({ where: { username }, paranoid: false });
        return json;
    }
    catch (e) {
        console.log('e', e);
        throw e;
    }
});
exports.userGetNameServices = userGetNameServices;
let createUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { username, password, role } = req.body;
        let salt = bcryptjs_1.default.genSaltSync(10);
        let hashPassword = bcryptjs_1.default.hashSync(password, salt);
        const json = yield User_1.default.create({
            username,
            password: hashPassword,
            role
        });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.createUserServices = createUserServices;
let editRoleServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { username, role } = req.body;
        const json = yield User_1.default.update({
            role
        }, { where: { username } });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.editRoleServices = editRoleServices;
let editPasswordServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { newpassword, username } = req.body;
        let salt = bcryptjs_1.default.genSaltSync(10);
        let hashPassword = bcryptjs_1.default.hashSync(newpassword, salt);
        const json = yield User_1.default.update({
            password: hashPassword
        }, { where: { username } });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.editPasswordServices = editPasswordServices;
let deleteUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { username } = req.body;
        const json = yield User_1.default.destroy({ where: { username } });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.deleteUserServices = deleteUserServices;
let usernameControlServices = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { username } });
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.usernameControlServices = usernameControlServices;
