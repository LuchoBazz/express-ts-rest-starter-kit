import axios from "axios";

const TIMEOUT_IN_MILLIS = 10000;
const BACKEND_URL = "https://identitytoolkit.googleapis.com/v1";

export const FIREBASE_API_KEY = "AIzaSyBvPr4oWIiuJ_84eISgA5gpt0XarBLjHRc";

export const firebaseApiInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT_IN_MILLIS,
  headers: {
    "Content-Type": "application/json",
  },
});
