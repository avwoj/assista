import express from "express";
import calendarRouter from "./calendar.js";
import userRouter from "./user.js";
import journalRouter from "./journal.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("endpoint");
});

router.use("/calendar", calendarRouter);
router.use("/user", userRouter);
router.use("/journal", journalRouter);

export default router;
