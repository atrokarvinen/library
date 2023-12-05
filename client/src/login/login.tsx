import { Button, Divider, Stack } from "@mui/material";
import { axios } from "../core/axios";
import { LoginForm } from "./loginForm";
import { LoginFormType } from "./loginFormType";
import { SignUpForm } from "./signUpForm";
import { SignUpFormType } from "./singUpFormType";

const Login = () => {
  const handleLogin = async (form: LoginFormType) => {
    console.log(`signing in user '${form.username}'...`);
    const response = await axios.post("/auth/signin", form);
    console.log(`signed in user '${response.data.name}'`);
  };

  const handleSignUp = async (form: SignUpFormType) => {
    console.log(`signing up user '${form.username}'...`);
    const response = await axios.post("/auth/signup", form);
    console.log(`signed up user '${response.data.name}'`);
  };

  const handleCancelSignUp = () => {
    console.log("Cancel sign up");
  };

  const handleLogout = async () => {
    console.log("logging out...");
    await axios.post("/auth/logout");
    console.log("logged out");
  };

  const generateUser = async () => {
    console.log("generating user...");
    const response = await axios.post("/auth/generate");
    console.log(`generated user '${response.data.name}'`);
    handleLogin({
      username: response.data.name,
      password: response.data.password,
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      <Divider sx={{ my: 2 }} />
      <SignUpForm onSubmit={handleSignUp} onCancel={handleCancelSignUp} />
      <Stack direction="column" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="contained" color="secondary" onClick={generateUser}>
          Generate user
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
