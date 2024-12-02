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
