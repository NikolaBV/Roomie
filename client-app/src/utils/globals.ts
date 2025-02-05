//TODO add a getUserId function for decoding the token and returning the user id

import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../api/models";
import { message } from "antd";

export const decodeToken = (token: string | null): DecodedToken | undefined => {
  if (token) {
    const decoded = jwtDecode(token);
    return decoded as DecodedToken;
  }
};

export const getToken = () => {
  return decodeToken(localStorage.getItem("token"));
};

export const signOut = () => {
  localStorage.removeItem("token");
  message.success("You have been signed out");
};
