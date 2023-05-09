import  express  from "express";

import { getPostsBySearch , getPost, getPosts,createPost,updatePost, deletePost, likePost,commentPost } from "../controllers/posts.js";
const router = express.Router();
import auth from "../middleware/auth.js";

//localhost :5000/posts

router.get('/',getPosts);
router.get('/:id', getPost);
router.get('/',getPostsBySearch);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.patch('/:id/commentPost',auth,commentPost);

export default router;