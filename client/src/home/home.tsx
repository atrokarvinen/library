import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { axios } from "../core/axios";
import { Book } from "./book";
import { BookList } from "./bookList";
import { NoBooks } from "./noBooks";

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter(
      (book) =>
        !searchText ||
        book.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
  }, [searchText, books]);

  const getBooks = async () => {
    const response = await axios.get<Book[]>("/books");
    setBooks(response.data);
  };

  return (
    <div>
      <h1>Library</h1>
      <div>
        <TextField
          label="Search"
          placeholder="Book name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <h2>Books:</h2>
        {filteredBooks.length > 0 && <BookList books={filteredBooks} />}
        {filteredBooks.length === 0 && <NoBooks />}
      </div>
    </div>
  );
}

export default Home;
