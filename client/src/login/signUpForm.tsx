import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { SignUpFormType } from "./singUpFormType";

type SignUpFormProps = {
  defaultValues?: SignUpFormType;
  onSubmit(form: SignUpFormType): void;
  onCancel(): void;
};

export const SignUpForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: SignUpFormProps) => {
  const { register, handleSubmit } = useForm<SignUpFormType>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2}>
        <TextField label="Username" {...register("username")} />
        <TextField label="Password" {...register("password")} type="password" />
        <TextField
          label="Confirm password"
          {...register("confirmPassword")}
          type="password"
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
