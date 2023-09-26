import {Router} from "express";
import {
    loginController, tokenGenerateController, logoutController,
} from "../controller/authController";

const router = Router();


router.get('/login',loginController)
router.get('/tokenGenerate',tokenGenerateController)
router.get('/logout',logoutController)

export default router
