import * as api from "../api";
import { FETCH_ALL, CREATE } from "../constants/calendar/actionTypes";

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.getEvents();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await api.createEvent(event);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
