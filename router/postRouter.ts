import {Router} from "express";
import {
    createPostController, deletePostController, editPostController, postGetDeletedController,
    postGetIdController, userGetPostController
} from "../controller/postController";
import readMW from '../middleware/authRead'
import writeMW from '../middleware/authwrite'
import adminMW from '../middleware/authAdmin'
const router = Router();


router.get('/',[readMW], postGetIdController);
router.get('/usergetpost',[readMW], userGetPostController);
router.get('/deleted',[readMW], postGetDeletedController);
router.post('/',[writeMW], createPostController);
router.put('/',[writeMW], editPostController);
router.delete('/',[adminMW], deletePostController);

export default router
