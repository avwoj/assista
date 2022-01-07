import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/calendar/actionTypes";

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...events, action.payload];
    case UPDATE:
      return events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
    case DELETE:
      return events.filter((event) => event._id !== action.payload);
    default:
      return events;
  }
};