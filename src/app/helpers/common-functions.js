import { toast } from "react-toastify";

export const showSuccessToastMessage = (message) => {
  console.log("success toaster called");
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toast-message-success",
  });
};

export const showErrorToastMessage = (message) => {
  console.log("error toaster called");
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toast-message-error",
  });
};

export const accessToken = (token) => {
  return {
    headers: {
      "x-access-token": token,
    },
  };
};
