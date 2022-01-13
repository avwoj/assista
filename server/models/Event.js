import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const EventSchema = mongoose.Schema({
  title: String,
  start: Date,
  startStr: String,
  end: Date,
  endStr: String,
  allDay: Boolean,
  author: {
    type: ObjectId,
    ref: "User",
  },
  //   description: String,
  //   createdAt: {
  //       type: Date,
  //       default: new Date(),
  //   }
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
