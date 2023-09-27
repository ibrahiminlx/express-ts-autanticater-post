"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authAdmin_1 = __importDefault(require("../middleware/authAdmin"));
const router = (0, express_1.Router)();
router.get('/', [authAdmin_1.default], userController_1.userGetNameController);
router.post('/', [authAdmin_1.default], userController_1.createUserController);
router.put('/role', [authAdmin_1.default], userController_1.editRoleController);
router.put('/password', [authAdmin_1.default], userController_1.editPasswordController);
router.delete('/', [authAdmin_1.default], userController_1.deleteUserController);
exports.default = router;
