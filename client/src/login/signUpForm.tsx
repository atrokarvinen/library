import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link as MuiLink, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignUpFormSchema } from "./signUpFormSchema";
import { SignUpFormType } from "./singUpFormType";

type SignUpFormProps = {
  defaultValues?: SignUpFormType;
  onSubmit(form: SignUpFormType): void;
};

export const SignUpForm = ({ defaultValues, onSubmit }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    defaultValues,
    resolver: zodResolver(SignUpFormSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Username"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />
        <TextField
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          {...register("password")}
        />
        <TextField
          label="Confirm password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          type="password"
          {...register("confirmPassword")}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <MuiLink
            component={Link}
            to="/login"
            color="inherit"
            underline="none"
          >
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </MuiLink>
        </Stack>
      </Stack>
    </form>
  );
};
