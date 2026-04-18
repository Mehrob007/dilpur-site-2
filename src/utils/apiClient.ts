import axios, { AxiosRequestHeaders } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: `${BASE_URL}api/`,
  headers: {
    "Content-Type": "application/json",
  } as AxiosRequestHeaders,
});

export default apiClient;
