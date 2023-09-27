"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controller/postController");
const authRead_1 = __importDefault(require("../middleware/authRead"));
const authwrite_1 = __importDefault(require("../middleware/authwrite"));
const authAdmin_1 = __importDefault(require("../middleware/authAdmin"));
const router = (0, express_1.Router)();
router.get('/', [authRead_1.default], postController_1.postGetIdController);
router.get('/usergetpost', [authRead_1.default], postController_1.userGetPostController);
router.get('/deleted', [authRead_1.default], postController_1.postGetDeletedController);
router.post('/', [authwrite_1.default], postController_1.createPostController);
router.put('/', [authwrite_1.default], postController_1.editPostController);
router.delete('/', [authAdmin_1.default], postController_1.deletePostController);
exports.default = router;
