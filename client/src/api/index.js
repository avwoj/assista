import axios from "axios";

const url = "http://localhost:5000/";

export const getEvents = () => axios.get(`${url}calendar`);
export const createEvent = (newEvent) => axios.post(`${url}calendar`, newEvent);
