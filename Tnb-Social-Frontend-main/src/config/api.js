// import axios from "axios";
// const jwtToken = localStorage.getItem("jwt")
// export const API_BASE_URL = 'http://localhost:5454';


// export const api = axios.create({
//   baseURL: API_BASE_URL, 
//   headers: {
//     'Authorization':`Bearer ${jwtToken}`,
//     'Content-Type': 'application/json',
//   },
// });


//This is the solution of not accessign current jwt problem

import axios from "axios";

export const API_BASE_URL = 'http://localhost:5454';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token from local storage
api.interceptors.request.use((config) => {       //config is previously setup config this can be updated or modified here with each request 
  const jwtToken = localStorage.getItem("jwt");
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//Specifically, 'api.interceptors.request.use' adds a function that will be invoked every time a request is made via the Axios instance (api).

//api.interceptors.request.use: This method takes two functions as arguments. The first function is executed before the request is sent, and the second function handles any errors that occur during this process.