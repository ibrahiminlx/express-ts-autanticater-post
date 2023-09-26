import {Router} from "express";
import {
    createPostController, deletePostController, editPostController, postGetDeletedController,
    postGetIdController
} from "../controller/postController";

const router = Router();


router.get('/', postGetIdController);
router.get('/deleted', postGetDeletedController);
router.post('/', createPostController);
router.put('/', editPostController);
router.delete('/', deletePostController);

export default router
