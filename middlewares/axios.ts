import axios from "axios";

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  //   validateStatus: status => {
  //     return status;
  //   },
});

// server.interceptors.request.use(
//   async config => {
//     const token = localStorage.getItem('st-gabriel-token') || undefined;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   err => {
//     const { error } = err.response.data;
//     console.log(error);

//     return Promise.reject({ ...err });
//   },
// );

export default server;
