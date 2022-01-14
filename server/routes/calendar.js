import express from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/calendar.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", auth, getEvents);
router.post("/:userId", auth, createEvent);
router.patch("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

export default router;
