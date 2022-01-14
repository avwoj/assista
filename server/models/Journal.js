import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const JournalSchema = mongoose.Schema({
  // date: Date,
  text: String,
  author: {
    type: ObjectId,
    ref: "User",
  },
});
const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;
