import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Book } from "./catalog/book";
import { BookFormType } from "./catalog/bookFormType";
import { axios } from "./core/axios";

function App() {
  const { register, handleSubmit } = useForm<BookFormType>({});

  const [books, setBooks] = useState<Book[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const handler = handleSubmit(async (data) => {
      await axios.post("/books", data);
      await getBooks();
    });
    handler(e);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await axios.get<Book[]>("/books");
    setBooks(response.data);
  };

  const deleteBook = async (id: string) => {
    await axios.delete("/books/" + id);
    getBooks();
  };

  return (
    <div>
      <h1>App</h1>
      <div>
        <h2>Add book</h2>
        <form onSubmit={onSubmit}>
          <TextField label="Title" {...register("title")} />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      </div>
      <div>
        <h2>Books:</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <span>{book.title}</span>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
