import { Router } from "express";

import {
  createPost,
  getPosts,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controllers";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", updatePost);
export default router;
