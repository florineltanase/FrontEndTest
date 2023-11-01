import axios from "axios";

const instance = axios.create({
  baseURL: "https://ak.contentcubed.com/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  auth: {
    username: import.meta.env.VITE_USER,
    password: import.meta.env.VITE_PASSWORD,
  },
});

export default instance;
