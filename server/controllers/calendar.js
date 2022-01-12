import mongoose from "mongoose";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const getEvents = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    //get calendar event.findOne for user then get calendar events
    const user = await User.findOne({ _id: userId });
    console.log(user);
    const events = await Event.find();
    // console.log(events);
    console.log(typeof userId);
    console.log(typeof events[events.length - 1].author);
    const filteredEvents = events.filter(
      (event) => String(event.author) === String(userId)
    );
    console.log(filteredEvents);
    res.status(200).json(filteredEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;

  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id: _id } = req.params;
  const event = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No event with that id");
  }
  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    { ...event, _id },
    { new: true }
  );
  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No event with that id");
  }
  await Event.findByIdAndRemove(_id);
  res.json({ message: "Event deleted successfully" });
};
