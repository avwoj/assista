const cards = [
  {
    id: "card-1",
    title: "Research GitHelp :)",
  },
  {
    id: "card-2",
    title: "Take doggie on a walk 🐕",
  },
  {
    id: "card-3",
    title: "Finish Cap-Stone Project 🤯",
  },
  {
    id: "card-4",
    title: "Take the trash out 🗑️",
  },
];

const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "ACTIVE - To Do",
      cards,
    },
    "list-2": {
      id: "list-2",
      title: "IN-PROGRESS",
      cards: [],
    },
    "list-3": {
      id: "list-3",
      title: "COMPLETED",
      cards: [],
    },
  },
  listIds: ["list-1", "list-2", "list-3"],
};

export default data;
