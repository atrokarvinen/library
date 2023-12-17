import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../core/axios";
import { useApiRequest } from "../core/useApiRequest";
import { LoginForm } from "./loginForm";
import { LoginFormType } from "./loginFormType";

const Login = () => {
  const { request } = useApiRequest();
  const navigate = useNavigate();

  const handleLogin = async (form: LoginFormType) => {
    console.log(`signing in user '${form.username}'...`);
    const response = await request(axios.post("/auth/signin", form));
    if (!response) return;
    console.log(`signed in user '${response.data.name}'`);
    navigate("/");
  };

  const generateUser = async () => {
    console.log("generating user...");
    const response = await request(axios.post("/auth/generate"));
    if (!response) return;
    console.log(`generated user '${response.data.name}'`);
    await handleLogin({
      username: response.data.name,
      password: response.data.password,
    });
    navigate("/");
  };

  return (
    <Box mt={2}>
      <LoginForm onSubmit={handleLogin} />
      <Divider sx={{ my: 2 }} />
      <Typography>Not a user? Sign up here</Typography>
      <Stack direction="column" spacing={2} mt={1}>
        <MuiLink
          component={Link}
          to="/login/signup"
          color="inherit"
          underline="none"
        >
          <Button variant="contained" sx={{ width: "100%" }}>
            Sign up
          </Button>
        </MuiLink>
        <Button variant="contained" color="secondary" onClick={generateUser}>
          Generate user
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
