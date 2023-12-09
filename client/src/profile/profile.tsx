import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { axios } from "../core/axios";
import { Borrowing } from "../home/borrowing";
import { BorrowingList } from "./borrowingList";

const Profile = () => {
  const [currentlyBorrowed, setCurrentlyBorrowed] = useState<Borrowing[]>([]);
  const [previouslyBorrowed, setPreviouslyBorrowed] = useState<Borrowing[]>([]);

  const getCurrentlyBorrowed = async () => {
    const response = await axios.get<Borrowing[]>("/borrowings");
    setCurrentlyBorrowed(response.data);
  };

  const getPreviouslyBorrowed = async () => {
    setPreviouslyBorrowed([]);
  };

  useEffect(() => {
    getCurrentlyBorrowed();
    getPreviouslyBorrowed();
  }, []);

  const returnBook = async (borrowingId: number) => {
    console.log(`Returning book with borrowingId (${borrowingId})`);
    const response = await axios.delete(`/borrowings/${borrowingId}`);
    console.log("Returned book response:", response);
    getCurrentlyBorrowed();
    getPreviouslyBorrowed();
  };

  const onExtendBorrowing = async (borrowingId: number) => {
    console.log(`Extending borrowing with borrowingId (${borrowingId})`);
    const response = await axios.put(`/borrowings/${borrowingId}`);
    console.log("Extended borrowing response:", response);
    getCurrentlyBorrowed();
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Currently borrowed:</h2>
      <Box data-testid="currently-borrowed">
        <BorrowingList
          borrowings={currentlyBorrowed}
          onReturnBook={returnBook}
          onExtendBorrowing={onExtendBorrowing}
        />
      </Box>
      <h2>Previously borrowed:</h2>
      <BorrowingList borrowings={previouslyBorrowed} />
    </div>
  );
};

export default Profile;
