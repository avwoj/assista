import express from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/calendar.js";

const router = express.Router();

router.get("/:userId", getEvents);
router.post("/:userId", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
