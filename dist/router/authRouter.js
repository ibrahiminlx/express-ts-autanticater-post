"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.get('/login', authController_1.loginController);
router.get('/tokenGenerate', authController_1.tokenGenerateController);
router.get('/logout', authController_1.logoutController);
exports.default = router;
