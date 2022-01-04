import axios from "axios";

const url = "http://localhost:5000/";

export const getEvents = () => axios.get(`${url}calendar`);
export const createEvent = (newEvent) => axios.post(`${url}calendar`, newEvent);
export const updateEvent = (id, updatedEvent) =>
  axios.patch(`${url}calendar/${id}`, updatedEvent);
export const deleteEvent = (id) => axios.delete(`${url}calendar/${id}`);
