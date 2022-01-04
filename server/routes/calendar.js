import express from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/calendar.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
