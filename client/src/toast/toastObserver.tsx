import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../core/store";
import { hide } from "./toastSlice";

export const ToastObserver = () => {
  const { toast } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <Snackbar
      open={toast.visible}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.message.severity}
        variant="filled"
      >
        {toast.message.message}
      </Alert>
    </Snackbar>
  );
};
