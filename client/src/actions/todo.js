import * as api from "../api/index";
import { FETCH_ALL, CREATE, UPDATE } from "../constants/actionTypes";

export const getTodo = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getTodo(userId);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const makeTodo = (newTodo, userId) => async (dispatch) => {
  try {
    const { data } = await api.makeTodo(newTodo, userId);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = (id, updatedTodo) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, updatedTodo);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
