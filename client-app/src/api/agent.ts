import axios, { AxiosResponse } from "axios";
import {
  CreatePostModel,
  LoginModel,
  Post,
  PostDetailsResult,
  Property,
  RoomateRequest,
  RoomateRequestCreateModel,
  UpdateRequestStatusDTO,
  UserAvailabilityModel,
  UserDTO,
} from "./models";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//Middlewere
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  create: (model: CreatePostModel) => requests.post("/posts", model),
  getPostsByUser: (userId: string) =>
    requests.get<Post[]>(`/posts/posts-by-user?userId=${userId}`),
};

const Accounts = {
  login: (loginDTO: LoginModel) =>
    requests.post<UserDTO>("/accounts/login", loginDTO),
  isUserAvaiable: (model: UserAvailabilityModel) =>
    requests.post<string>(`/accounts/is-user-available`, model),
};

const RoomateRequests = {
  create: (model: RoomateRequestCreateModel) =>
    requests.post<RoomateRequest>("/RoomateRequests", model),
  delete: (id: string) => requests.delete(`/RoomateRequests/${id}`),

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

const ApprovedRoomates = {
   getPostIdByUser: (userId: string) =>
    requests.get<string>(`/approvedRoomates/post-by-user?userId=${userId}`),
}

const Properties = {
  getPropertyByPostId: (postId: string) => 
    requests.get<Property>(`/properties/get-property?postId=${postId}`)
};
const agent = {
  Posts,
  Accounts,
  RoomateRequests,
  Properties,
  ApprovedRoomates
};

export default agent;
