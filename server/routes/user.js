import express from "express";
import { getUser, createUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
//router.route("/:id").get(async (req,res)=>{etc.})
router.post("/signup", createUser);
export default router;
