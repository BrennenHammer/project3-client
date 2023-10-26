import axios from "axios";
import { API_URL } from "./API_URL";

const getToken = () => localStorage.getItem("authToken");

axios.interceptors.response.use(
    response => response,
    error => {
        // Handle any global error logic here, like redirecting the user to login if they are unauthorized
        if (error.response.status === 401) {
            console.error('Unauthorized, please log in again');
        }
        return Promise.reject(error);
    }
);

export const get = (route) => {
  const token = getToken();
  return axios.get(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const post = (route, body, requireAuth = true) => {
  let headers = {};

  if (requireAuth) {
    const token = getToken();
    headers = { Authorization: `Bearer ${token}` };
  }

  return axios.post(API_URL + route, body, {
    headers: headers,
  });
};
