import {Router} from "express";
import {
    createUserController,
    deleteUserController, editPasswordController,
    editRoleController,
    userGetNameController
} from "../controller/userController";

const router = Router();


router.get('/', userGetNameController);
router.post('/', createUserController);
router.put('/role', editRoleController);
router.put('/password', editPasswordController);
router.delete('/', deleteUserController);

export default router
