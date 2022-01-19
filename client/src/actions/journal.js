import * as api from "../api/index";
import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export const getJournal = (userId, date = "") => async (dispatch) => {
  try {
    const { data } = await api.getJournal(userId, date);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const writeJournal = (journalEntry, userId) => async (dispatch) => {
  try {
    const { data } = await api.writeJournal(journalEntry, userId);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
