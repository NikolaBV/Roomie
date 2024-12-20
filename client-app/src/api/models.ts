export type RequestStatus = "Pending" | "Rejected" | "Approved" | "None";

export interface Post {
  id: string;
  title: string;
  description: string;
  status: boolean;
  freeSpots: number;
  createdAt: string;
  updatedAt: string;
  roomateRequests: RoomateRequest[];
}
export interface User {
  bio: string;
  username: string;
  email: string;
  createdPosts: Post[];
  roomateRequests: RoomateRequest[];
}
export interface LoginModel {
  email: string;
  password: string;
}
export interface UserDTO {
  token: string;
  username: string;
}

export interface RoomateRequestCreateModel {
  userId: string;
  postId: string;
}

export interface RoomateRequest {
  id: string;
  status: string;
  createdAt: string;
  userId: string;
  user: User;
  postId: string;
  post: Post;
}
export interface UpdateRequestStatusDTO {
  requestId: string;
  newStatus: RequestStatus;
}
export interface DecodedToken {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  unique_name: string;
}

export interface PostDetailsResult {
  post: Post;
  hasUserRequestedThePost: boolean;
  requestStatus: RequestStatus;
}
export interface CreatePostModel {
  title: string;
  description: string;
  freeSpots: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string | undefined;
}
