import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  title: String,
  start: Date,
  startStr: String,
  end: Date,
  endStr: String,
  allDay: Boolean,
  //   description: String,
  //   createdAt: {
  //       type: Date,
  //       default: new Date(),
  //   }
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
