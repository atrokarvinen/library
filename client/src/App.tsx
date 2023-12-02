import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddBookForm from "./catalog/addBookForm";
import { Book } from "./catalog/book";
import { axios } from "./core/axios";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

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
      <AddBookForm />
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
