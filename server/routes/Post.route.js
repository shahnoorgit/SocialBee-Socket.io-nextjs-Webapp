import { createPost, getPost } from "../controller/Post.controller.js";
import express from "express";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/fetch-post", getPost);

export default router;
