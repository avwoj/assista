import express from "express";
import {
  getJournal,
  writeJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journal.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/:userId", auth, getJournal);
router.get("/:userId", getJournal);
router.post("/:userId", writeJournal);
router.patch("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;
