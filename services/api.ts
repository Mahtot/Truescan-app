import axios from "axios";
import Constants from "expo-constants";

const { apiBaseUrl } = Constants.expoConfig?.extra || {}; // Fallback safe check

const API = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
