import Journal from "../models/Journal.js";
import User from "../models/User.js";

export const getJournal = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const journalEntries = await Journal.find();
    // console.log(journalEntries);
    const filteredJournalEntries = journalEntries.filter(
      date.length > 0
        ? (entry) =>
            String(entry.author) === String(userId) && entry.date === date
        : (entry) => String(entry.author) === String(userId)
    );
    res.status(200).json(filteredJournalEntries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const writeJournal = async (req, res) => {
  const journalEntry = req.body;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  const newJournalEntry = new Journal(journalEntry);
  try {
    await newJournalEntry.save();
    res.status(201).json(newJournalEntry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateJournal = async (req, res) => {};
export const deleteJournal = async (req, res) => {};
