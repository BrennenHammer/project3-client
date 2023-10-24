import { API_URL } from "./API_URL";

import axios from "axios";

export const get = (route) => {
  let token = localStorage.getItem("authToken");

  return axios.get(API_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  })
};

export const post = (route, body, requireAuth = true) => {
  let headers = {};

  if (requireAuth) {
    let token = localStorage.getItem("authToken");
    headers = { Authorization: `Bearer ${token}` };
  }

  return axios.post(API_URL + route, body, {
    headers: headers,
  });
};
