import axios from "axios";

const TIMEOUT_IN_MILLIS = 10000;
const BACKEND_URL = "http://localhost:3000";

export const FIREBASE_KEY = "AIzaSyBLUKN91Zgk-jVNSe1ragNONJJbppL3DZk";

export const backendApiInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT_IN_MILLIS,
  headers: {
    "Content-Type": "application/json",
  },
});
