import axios, { AxiosResponse } from "axios";
import {
  LoginModel,
  Post,
  PostDetailsResult,
  RequestStatus,
  RoomateRequest,
  RoomateRequestCreateModel,
  UpdateRequestStatusDTO,
  UserDTO,
} from "./models";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Posts = {
  list: () => requests.get<Post[]>("/posts"),
  details: (id: string, userId?: string) => {
    const url = userId ? `/posts/${id}?userId=${userId}` : `/posts/${id}`;
    return requests.get<PostDetailsResult>(url);
  },
  getPostByUser: (userId: string) =>
    requests.get<Post[]>(`/posts/get-post-by-user?userId=${userId}`),
};

const Accounts = {
  login: (loginDTO: LoginModel) =>
    requests.post<UserDTO>("/accounts/login", loginDTO),
};

const RoomateRequests = {
  create: (model: RoomateRequestCreateModel) =>
    requests.post<RoomateRequest>("/RoomateRequests", model),
  getRequestsForPost: (postId: string) =>
    requests.get<RoomateRequest[]>(
      `/RoomateRequests/get-requests-for-post?postId=${postId}`
    ),
  getRequestsForUser: (userId: string) =>
    requests.get<RoomateRequest[]>(
      `/RoomateRequests/get-requests-for-user?userId=${userId}`
    ),
  updateStatus: (model: UpdateRequestStatusDTO) =>
    requests.put(`/RoomateRequests/update-status`, model),
};
const agent = {
  Posts,
  Accounts,
  RoomateRequests,
};

export default agent;
