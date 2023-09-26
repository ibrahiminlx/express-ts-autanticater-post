import {Router} from "express";
import {
    createUserController,
    deleteUserController, editPasswordController,
    editRoleController,
    userGetNameController
} from "../controller/userController";
import adminMW from '../middleware/authAdmin'

const router = Router();


router.get('/',[adminMW], userGetNameController);
router.post('/', [adminMW],createUserController);
router.put('/role',[adminMW], editRoleController);
router.put('/password',[adminMW], editPasswordController);
router.delete('/',[adminMW], deleteUserController);

export default router
