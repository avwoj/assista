import { FETCH_ALL, CREATE, UPDATE } from "../constants/actionTypes";

export default (todo = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...todo, action.payload];
    case UPDATE:
      return todo.map((todoItem) =>
        todoItem._id === action.payload._id ? action.payload : todoItem
      );
    default:
      return [...todo];
  }
};
