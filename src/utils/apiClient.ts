import axios, { AxiosRequestHeaders } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  } as AxiosRequestHeaders,
});

export default apiClient;
