import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { axios, borrowingAxios } from "../core/axios";
import { Book } from "../home/book";
import { Borrowing } from "../home/borrowing";
import { BorrowingList } from "./borrowingList";

const Profile = () => {
  const [currentlyBorrowed, setCurrentlyBorrowed] = useState<Borrowing[]>([]);
  const [previouslyBorrowed, setPreviouslyBorrowed] = useState<Borrowing[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const getCurrentlyBorrowed = async () => {
    const response = await borrowingAxios.get<Borrowing[]>("/borrowing/user");
    setCurrentlyBorrowed(response.data);
  };

  const getPreviouslyBorrowed = async () => {
    const response = await borrowingAxios.get<Borrowing[]>(
      "/borrowing/history"
    );
    setPreviouslyBorrowed(response.data);
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      await getBooks();
      await getCurrentlyBorrowed();
      await getPreviouslyBorrowed();
    } catch (error) {
      console.log("Error loading profile: " + error);
    }
    setLoading(false);
  };

  const returnBook = async (borrowingId: number) => {
    console.log(`Returning book with borrowingId (${borrowingId})`);
    const response = await borrowingAxios.delete(`/borrowing/${borrowingId}`);
    console.log("Returned book response:", response);
    getCurrentlyBorrowed();
    getPreviouslyBorrowed();
  };

  const onExtendBorrowing = async (borrowingId: number) => {
    console.log(`Extending borrowing with borrowingId (${borrowingId})`);
    const response = await borrowingAxios.put(`/borrowing/${borrowingId}`);
    console.log("Extended borrowing response:", response);
    getCurrentlyBorrowed();
  };

  const getBooks = async () => {
    const response = await axios.get<Book[]>("/books");
    setBooks(response.data);
  };

  if (loading) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Currently borrowed:</h2>
      <Box data-testid="currently-borrowed">
        <BorrowingList
          books={books}
          borrowings={currentlyBorrowed}
          onReturnBook={returnBook}
          onExtendBorrowing={onExtendBorrowing}
        />
      </Box>
      <h2>Previously borrowed:</h2>
      <Box data-testid="previously-borrowed">
        <BorrowingList books={books} borrowings={previouslyBorrowed} />
      </Box>
    </div>
  );
};

export default Profile;
