import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { axios, borrowingAxios } from "../core/axios";
import { Book } from "./book";
import { BookList } from "./bookList";
import { Borrowing } from "./borrowing";
import { NoBooks } from "./noBooks";

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter(
      (book) =>
        !searchText ||
        book.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
  }, [searchText, books]);

  const load = async () => {
    await getBooks();
    await getBorrowings();
  };

  const getBooks = async () => {
    const response = await axios.get<Book[]>("/books");
    setBooks(response.data);
  };

  const getBorrowings = async () => {
    const response = await borrowingAxios.get<Borrowing[]>("/borrowing");
    setBorrowings(response.data);
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
        {filteredBooks.length > 0 && (
          <BookList books={filteredBooks} borrowings={borrowings} />
        )}
        {filteredBooks.length === 0 && <NoBooks />}
      </div>
    </div>
  );
}

export default Home;
