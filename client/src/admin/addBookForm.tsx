import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { axios } from "../core/axios";
import { BookFormType } from "../home/bookFormType";

const AddBookForm = () => {
  const { register, handleSubmit } = useForm<BookFormType>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const handler = handleSubmit(async (data) => {
      const convertedData: BookFormType = {
        ...data,
        authorId: Number(data.authorId),
        libraryId: Number(data.libraryId),
      };
      await axios.post("/books", convertedData);
      // await getBooks();
    });
    handler(e);
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={onSubmit}>
        <Stack spacing={1}>
          <TextField label="Title" {...register("title")} />
          <TextField label="Author" {...register("authorId")} value={1} />
          <TextField label="ISBN" {...register("isbn")} value={"123456789"} />
          <TextField label="Library" {...register("libraryId")} value={1} />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddBookForm;
