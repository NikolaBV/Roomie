import { RequestStatus } from "../../../api/models";

export const getPostButtonText = (
  isUserAvaiable: string,
  requestStatus: RequestStatus | undefined
): string => {
  switch (!!isUserAvaiable) {
    case true:
      if (requestStatus === "None") {
        return "Send a Roomie Request";
      } else if (requestStatus === "Pending") {
        return "Pending Request";
      } else if (requestStatus === "Rejected") {
        return "You have been rejected";
      }
      break;
    case false:
      return "You are already a Roomie!";
  }
  return "";
};

export const isPostButtonDisabled = (
  hasUserRequestedThePost: boolean | undefined,
  isUserAvaiable: string
): boolean => {
  if (hasUserRequestedThePost || !!!isUserAvaiable) {
    return true;
  } else {
    return false;
  }
};
