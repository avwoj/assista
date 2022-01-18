import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//Calendar API Calls
export const getEvents = (userId) => API.get(`/calendar/${userId}`);
export const createEvent = (newEvent, userId) =>
  API.post(`/calendar/${userId}`, newEvent);
export const updateEvent = (id, updatedEvent) =>
  API.patch(`/calendar/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/calendar/${id}`);

//User API Calls
//need to add password requirements and an update password section
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);


//Journal calls
export const getJournal = (userId, date) => API.get(`/journal/${userId}`, {params: {date:date}});
export const writeJournal = (newJournalEntry, userId) =>
  API.post(`/journal/${userId}`, newJournalEntry);

//Todo API calls
export const getTodo = (userId) => API.get(`/todo/${userId}`);
export const makeTodo = (newTodo, userId) =>
  API.post(`/todo/${userId}`, newTodo);
export const updateTodo = (id, updatedTodo) =>
  API.patch(`/todo/${id}`, updatedTodo);
