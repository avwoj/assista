import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//Calendar API Calls
export const getEvents = (userId) => API.get(`/calendar/${userId}`);
export const createEvent = (newEvent, userId) =>
  API.post(`/calendar/${userId}`, newEvent);
export const updateEvent = (id, updatedEvent) =>
  API.patch(`/calendar/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/calendar/${id}`);

//User API Calls

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
