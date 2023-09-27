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
exports.postUserGetAllPostsServices = exports.postUserControlServices = exports.postnameControlServices = exports.postIdDeletedControlServices = exports.postGetDeletedServices = exports.postIdControlServices = exports.deletePostServices = exports.editPostSevices = exports.createPostServices = exports.postGetIdServices = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const helper_1 = require("../db/helper");
let postGetIdServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postid } = req.body;
        const json = yield Post_1.default.findOne({ where: { id: postid }, paranoid: false });
        return json;
    }
    catch (e) {
        console.log('e', e);
        throw e;
    }
});
exports.postGetIdServices = postGetIdServices;
let postGetDeletedServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postid } = req.body;
        const json = yield Post_1.default.findOne({ where: { id: postid }, paranoid: false });
        return json;
    }
    catch (e) {
        console.log('e', e);
        throw e;
    }
});
exports.postGetDeletedServices = postGetDeletedServices;
let createPostServices = (req, res, userid) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { postname, postdescription } = req.body;
        const json = yield Post_1.default.create({
            userid: userid,
            postname,
            postdescription
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
exports.createPostServices = createPostServices;
let editPostSevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { postid, postname, postdescription } = req.body;
        const json = yield Post_1.default.update({
            postname,
            postdescription
        }, { where: { id: postid } });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.editPostSevices = editPostSevices;
let deletePostServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = null;
    try {
        transaction = yield helper_1.db.sequelize.transaction();
        const { postid } = req.body;
        const json = yield Post_1.default.destroy({ where: { id: postid } });
        yield transaction.commit();
        return json;
    }
    catch (e) {
        yield transaction.rollback();
        console.log('e', e);
        throw e;
    }
});
exports.deletePostServices = deletePostServices;
let postIdControlServices = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findOne({ where: { id: postId } });
        return post;
    }
    catch (e) {
        throw e;
    }
});
exports.postIdControlServices = postIdControlServices;
let postIdDeletedControlServices = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findOne({ where: { id: postId }, paranoid: false });
        return post;
    }
    catch (e) {
        throw e;
    }
});
exports.postIdDeletedControlServices = postIdDeletedControlServices;
let postnameControlServices = (postname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Post_1.default.findOne({ where: { postname } });
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.postnameControlServices = postnameControlServices;
let postUserControlServices = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Post_1.default.findOne({ where: { userid } });
        if (user === null || user === void 0 ? void 0 : user.dataValues) {
            return true;
        }
        return false;
    }
    catch (e) {
        throw e;
    }
});
exports.postUserControlServices = postUserControlServices;
let postUserGetAllPostsServices = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Post_1.default.findAll({ where: { userid } });
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.postUserGetAllPostsServices = postUserGetAllPostsServices;
