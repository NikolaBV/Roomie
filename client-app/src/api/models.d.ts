type RequestStatus = "Pending" | "Rejected" | "Approved";
export interface Post {
  id: string;
  title: string;
  description: string;
  status: boolean;
  freeSpots: number;
  createdAt: string;
  updatedAt: string;
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
  status: RequestStatus;
  createdAt: string;
  userId: string;
  user: User;
  postId: string;
  post: Post;
}
export interface DecodedToken {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  unique_name: string;
}
