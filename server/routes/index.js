import express from "express";
import calendarRouter from "./calendar.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("endpoint");
});

router.use("/calendar", calendarRouter);

export default router;
