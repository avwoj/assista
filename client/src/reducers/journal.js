import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export default (journalEntries = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...journalEntries, action.payload];

    default:
      return journalEntries;
  }
};
