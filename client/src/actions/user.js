import axios from "axios";
import * as api from "../api";
import { CREATE } from "../constants/user/actionTypes";

export const createUser = (name, email, password) => async (dispatch) => {
  try {
    const { newUser } = await api.createUser({ name, email, password });
    dispatch({ type: CREATE, payload: newUser });
  } catch (error) {
    console.log(error);
  }
};
