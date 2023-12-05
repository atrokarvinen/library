import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormType } from "./loginFormType";

type LoginFormProps = {
  defaultValues?: LoginFormType;
  onSubmit(form: LoginFormType): void;
};

export const LoginForm = ({ defaultValues, onSubmit }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<LoginFormType>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2}>
        <TextField label="Username" {...register("username")} />
        <TextField label="Password" {...register("password")} type="password" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </form>
  );
};
