import { Button, Stack } from "@mui/material";
import base from "axios";
import { useApiRequest } from "./core/useApiRequest";

export const authAxios = base.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const TestPage = () => {
  const { request } = useApiRequest();

  const helloWorld = async () => {
    const response = await request(authAxios.get("/"));
    if (!response) return;
  };

  const signin = async () => {
    const payload = { username: "test", password: "test" };
    const response = await request(authAxios.post("/signin", payload));
    if (!response) return;
  };

  const signup = async () => {
    const response = await request(authAxios.post("/signup"));
    if (!response) return;
  };

  const logout = async () => {
    const response = await request(authAxios.post("/logout"));
    if (!response) return;
  };

  const generate = async () => {
    const response = await request(authAxios.post("/generate"));
    if (!response) return;
  };

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={helloWorld}>
        Hello
      </Button>
      <Button variant="contained" onClick={signin}>
        Signin
      </Button>
      <Button variant="contained" onClick={signup}>
        Signup
      </Button>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
      <Button variant="contained" onClick={generate}>
        Generate
      </Button>
    </Stack>
  );
};
