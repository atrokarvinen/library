import { AxiosResponse } from "axios";
import { showToast } from "../toast/toastSlice";
import { getErrorMessage } from "./errorHandling";
import { useAppDispatch } from "./store";

export const useApiRequest = () => {
  const dispatch = useAppDispatch();

  const request = async (apiCall: Promise<AxiosResponse<any, any>>) => {
    try {
      return await apiCall;
    } catch (error) {
      const message = getErrorMessage(error);
      dispatch(showToast({ message, severity: "error" }));
    }
  };

  return { request };
};
