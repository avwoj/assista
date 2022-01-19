import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export default (journal = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...journal, action.payload];

    default:
      return [...journal];
  }
};
