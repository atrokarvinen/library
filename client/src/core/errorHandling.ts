import { AxiosError, isAxiosError } from "axios";

export const getErrorMessage = (error: any) => {
  console.log("handling error", error);

  let message = "Unknown error";
  if (isAxiosError(error)) {
    console.log("handling axios error", error);
    const axiosError: AxiosError = error;
    const data: any = axiosError.response?.data;
    if (data?.message) {
      console.log("data?.message");
      message = data.message;
    } else if (axiosError.response?.status === 500) {
      console.log("axiosError.response?.status === 500");
      message = "Internal server error";
    } else if (axiosError.message) {
      console.log("axiosError.message");
      message = axiosError.message;
    }
  } else if (typeof error?.message === "string") {
    console.log("typeof  error?.message === 'string'");
    message = "Client side error: " + error.message;
  }
  console.log("error message", message);
  return message;
};
