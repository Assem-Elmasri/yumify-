import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user/";

const userAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // default
  },
  withCredentials: true, // Include cookies in requests
});

export default userAPI;