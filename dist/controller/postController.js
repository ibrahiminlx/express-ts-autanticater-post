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
exports.userGetPostController = exports.postGetDeletedController = exports.deletePostController = exports.editPostController = exports.createPostController = exports.postGetIdController = void 0;
const postServices_1 = require("../services/postServices");
const baseResponse_1 = __importDefault(require("../dto/baseResponse"));
const postValidations_1 = require("./validations/postValidations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = require("../services/userServices");
let postGetIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postid } = req.body;
        (0, postValidations_1.postValidations)({ postid: postid });
        const data = yield (0, postServices_1.postIdControlServices)(postid);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu post sistemde bulunamadi.');
        }
        const json = yield (0, postServices_1.postGetIdServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.postGetIdController = postGetIdController;
let userGetPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers['x-access-token'];
        let username = '';
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err, data) => {
            var _a;
            username = (_a = data === null || data === void 0 ? void 0 : data.compareResult) === null || _a === void 0 ? void 0 : _a.username;
        });
        const data = yield (0, userServices_1.usernameControlServices)(username);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu user sistemde bulunamadi.');
        }
        else {
            let userid = (_a = data === null || data === void 0 ? void 0 : data.dataValues) === null || _a === void 0 ? void 0 : _a.id;
            const userInPostData = (0, postServices_1.postUserControlServices)(userid);
            userInPostData.then((data) => __awaiter(void 0, void 0, void 0, function* () {
                if (data === true) {
                    const json = yield (0, postServices_1.postUserGetAllPostsServices)(userid);
                    res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
                }
                else {
                    throw new Error('Bu userin postu bulunamadi.');
                }
            }));
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.userGetPostController = userGetPostController;
let postGetDeletedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postid } = req.body;
        (0, postValidations_1.postValidations)({ postid: postid });
        const data = yield (0, postServices_1.postIdDeletedControlServices)(postid);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu post sistemde bulunamadi.');
        }
        const json = yield (0, postServices_1.postGetDeletedServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.postGetDeletedController = postGetDeletedController;
let createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { postname, postdescription } = req.body;
        const token = req.headers['x-access-token'];
        (0, postValidations_1.postValidations)({ postname, postdescription });
        let username = '';
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err, data) => {
            username = data.compareResult.username;
        });
        const data = yield (0, userServices_1.usernameControlServices)(username);
        let userid = (_b = data === null || data === void 0 ? void 0 : data.dataValues) === null || _b === void 0 ? void 0 : _b.id;
        const postNameControl = yield (0, postServices_1.postnameControlServices)(postname);
        if ((postNameControl === null || postNameControl === void 0 ? void 0 : postNameControl.dataValues) === undefined) {
            const json = yield (0, postServices_1.createPostServices)(req, res, userid);
            res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
        }
        else {
            throw new Error('Bu post sistemde bulunuyor.');
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.createPostController = createPostController;
let editPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { postid, postname, postdescription } = req.body;
        if (postname !== undefined)
            (0, postValidations_1.postValidations)({ postname });
        if (postdescription !== undefined)
            (0, postValidations_1.postValidations)({ postdescription });
        if (postid !== undefined)
            (0, postValidations_1.postValidations)({ postid });
        const data = yield (0, postServices_1.postIdControlServices)(postid);
        let postUserId = (_c = data === null || data === void 0 ? void 0 : data.dataValues) === null || _c === void 0 ? void 0 : _c.userid;
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu post sistemde bulunamadi.');
        }
        if (postname.length !== 0) {
            const postNameControl = yield (0, postServices_1.postnameControlServices)(postname);
            if ((postNameControl === null || postNameControl === void 0 ? void 0 : postNameControl.dataValues) === undefined) {
                const token = req.headers['x-access-token'];
                let username = '';
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY || '', (err, data) => {
                    username = data.compareResult.username;
                });
                const data = yield (0, userServices_1.usernameControlServices)(username);
                let tokenUserid = (_d = data === null || data === void 0 ? void 0 : data.dataValues) === null || _d === void 0 ? void 0 : _d.id;
                if (tokenUserid === postUserId) {
                    const json = yield (0, postServices_1.editPostSevices)(req, res);
                    res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
                }
                else {
                    throw new Error('Kendinizin olmayan bir postu degistiremezsiniz.');
                }
            }
            else {
                throw new Error('Bu postname sistemde bulunuyor.');
            }
        }
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.editPostController = editPostController;
let deletePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postid } = req.body;
        (0, postValidations_1.postValidations)({ postid });
        const data = yield (0, postServices_1.postIdControlServices)(postid);
        if ((data === null || data === void 0 ? void 0 : data.dataValues) === undefined) {
            throw new Error('Bu post sistemde bulunamadi.');
        }
        const json = yield (0, postServices_1.deletePostServices)(req, res);
        res.json(baseResponse_1.default.baseResponseFunctionSuccess({ data: json }));
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json(baseResponse_1.default.baseResponseFunctionError({ message: e.message }));
    }
});
exports.deletePostController = deletePostController;
