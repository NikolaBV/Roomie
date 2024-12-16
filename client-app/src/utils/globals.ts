//TODO add a getUserId function for decoding the token and returning the user id

import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../api/models";

export const decodeToken = (token: string | null): DecodedToken | undefined => {
  if (token) {
    const decoded = jwtDecode(token);
    return decoded as DecodedToken;
  }
};

export const getToken = () => {
  return decodeToken(localStorage.getItem("token"));
};
