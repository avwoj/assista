import express from "express";
import { getTodo, makeTodo, updateTodo } from "../controllers/todo.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", getTodo);
router.post("/:userId", auth, makeTodo);
router.patch("/:id", auth, updateTodo);

export default router;
