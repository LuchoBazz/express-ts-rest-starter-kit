import axios from "axios";

const TIMEOUT_IN_MILLIS = 10000;

export const FIREBASE_KEY = "AIzaSyBLUKN91Zgk-jVNSe1ragNONJJbppL3DZk";

export const firebaseApiInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com",
  timeout: TIMEOUT_IN_MILLIS,
  headers: {
    "Content-Type": "application/json",
  },
});
