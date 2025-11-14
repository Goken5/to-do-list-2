import axios from "axios";

export const api = axios.create({
    baseURL: "https://to-do-list-g-backend.vercel.app",
    withCredentials: true,
});