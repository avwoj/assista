import express from "express";
import calendarRouter from "./calendar.js";
import userRouter from "./user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("endpoint");
});

router.use("/calendar", calendarRouter);
router.use("/user", userRouter);

export default router;
