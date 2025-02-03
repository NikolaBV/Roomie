export type RequestStatus = "Pending" | "Rejected" | "Approved" | "None";
export type MyRoomieTabs =
  | "General"
  | "Property"
  | "Roomies"
  | "Rent"
  | "Payments";

export type ApartmentType =
  | "Studio"
  | "OneBedroom"
  | "TwoBedroom"
  | "ThreeBedroom"
  | "Other";

export interface Post {
  id: string;
  title: string;
  description: string;
  status: boolean;
  freeSpots: number;
  createdAt: string;
  updatedAt: string;
  property: Property;
  propertyId: string;
  creatorId: string;
  roomateRequests: RoomateRequest[];
}
export interface User {
  bio: string;
  username: string;
  email: string;
  createdPosts: Post[];
  roomateRequests: RoomateRequest[];
}
export interface RoomieUser {
  bio: string;
  available: boolean;
  propertyId: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel {
  email: string;
  password: string;
  username: string;
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
  creatorId: string | undefined;
  propertyId: string | null;
}
export interface CreatePropertyModel {
  address: string;
  apartmentType: ApartmentType;
  numberOfRooms: number;
  furnished: boolean;
  rent: number;
  additionalNotes: string;
  userId: string;
  postId: string | null;
}

export interface UserAvailabilityModel {
  userId: string;
}

export interface Property {
  id: string;
  address: string;
  apartmentType: ApartmentType;
  numberOfRooms: number;
  furnished: boolean;
  rent: number;
  additionalNotes: string;
  postId: string;
  post: Post;
}

export interface EditPostModel {
  id: string;
  title: string;
  description: string;
  freeSpots: number;
}
