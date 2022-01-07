import { CREATE } from "../constants/user/actionTypes";

export default (users = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...users, action.payload];
    default:
      return users;
  }
};
