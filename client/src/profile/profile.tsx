import { useEffect, useState } from "react";
import { Book, defaultBook } from "../home/book";
import { BookList } from "../home/bookList";

const Profile = () => {
  const [currentlyBorrowed, setCurrentlyBorrowed] = useState<Book[]>([]);
  const [previouslyBorrowed, setPreviouslyBorrowed] = useState<Book[]>([]);

  const getCurrentlyBorrowed = async () => {
    // const response = await axios.get<Book[]>("/books");
    const response: { data: Book[] } = {
      data: [
        { ...defaultBook, id: 1, title: "Testing" },
        { ...defaultBook, id: 2, title: "Harry potter" },
        { ...defaultBook, id: 3, title: "Little Mermaid" },
      ],
    };
    setCurrentlyBorrowed(response.data);
  };

  const getPreviouslyBorrowed = async () => {
    // const response = await axios.get<Book[]>("/books");
    const response: { data: Book[] } = {
      data: [{ ...defaultBook, id: 1, title: "Huckleberry Finn" }],
    };
    setPreviouslyBorrowed(response.data);
  };

  useEffect(() => {
    getCurrentlyBorrowed();
    getPreviouslyBorrowed();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Currently borrowed:</h2>
      <BookList books={currentlyBorrowed} />
      <h2>Previously borrowed:</h2>
      <BookList books={previouslyBorrowed} />
    </div>
  );
};

export default Profile;
