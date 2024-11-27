import axios, { AxiosResponse } from "axios";
import { Order } from "./models";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Orders = {
  list: () => requests.get<Order>("/orders"),
  details: (id: string) => requests.get<Order>(`/order/${id}`),
};

const agent = {
  Orders,
};

export default agent;
