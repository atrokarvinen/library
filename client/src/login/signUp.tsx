import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { axios } from "../core/axios";
import { useAppDispatch } from "../core/store";
import { useApiRequest } from "../core/useApiRequest";
import { showToast } from "../toast/toastSlice";
import { SignUpForm } from "./signUpForm";
import { SignUpFormType } from "./singUpFormType";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { request } = useApiRequest();

  const handleSignUp = async (form: SignUpFormType) => {
    console.log(`signing up user '${form.username}'...`);
    const response = await request(axios.post("/auth/signup", form));
    if (!response) return;
    console.log(`signed up user '${response.data.name}'`);
    navigate("/login");
  };

  const testToast = () => {
    dispatch(showToast({ message: "Test", severity: "success" }));
  };

  const testToastError = () => {
    dispatch(showToast({ message: "Test", severity: "error" }));
  };

  return (
    <Box mt={2}>
      <SignUpForm onSubmit={handleSignUp} />
      <Button onClick={testToast}>Success</Button>
      <Button onClick={testToastError}>Error</Button>
    </Box>
  );
};
