import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axios, borrowingAxios } from "../core/axios";
import { useApiRequest } from "../core/useApiRequest";
import { Book, BookItem } from "./book";
import { BookDetailsItemsTable } from "./bookDetailsItemsTable";
import { BookDetailsTable } from "./bookDetailsTable";
import { BookInformationText } from "./bookInformationText";
import { Borrowing, CreateBorrowingDto } from "./borrowing";
import { getAvailableCount } from "./borrowingCount";

export const BookDetails = () => {
  const { request } = useApiRequest();
  const routeParams = useParams();
  const id = Number(routeParams.id);
  const [book, setBook] = useState<Book | null>(null);
  const [bookItems, setBookItems] = useState<BookItem[]>([]);
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load(id);
  }, [id]);

  const load = async (bookId: number) => {
    setLoading(true);
    try {
      await getBook(bookId);
      await getBorrowings(bookId);
      await getBookItems(bookId);
    } catch (error) {
      console.log("Error loading book details: " + error);
    }
    setLoading(false);
  };

  const getBook = async (bookId: number) => {
    const response = await axios.get<Book>(`/books/${bookId}`);
    setBook(response.data);
  };

  const getBorrowings = async (bookId: number) => {
    const url = `/borrowing/book/${bookId}`;
    const response = await borrowingAxios.get<Borrowing[]>(url);
    setBorrowings(response.data);
  };

  const getBookItems = async (bookId: number) => {
    const response = await axios.get<BookItem[]>(`/books/${bookId}/items`);
    setBookItems(response.data);
  };

  if (loading || !book) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  const borrowedItems = borrowings.map((borrowing) => borrowing.bookItemId);
  const borrowBook = async () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 14);
    const availableItem = bookItems.find(
      (item) => !borrowedItems.includes(item.id)
    );
    if (!availableItem) {
      console.log("No available items");
      return;
    }
    const bookItemId = availableItem.id;
    const payload: CreateBorrowingDto = { bookId: id, bookItemId, end, start };
    const response = await request(borrowingAxios.post(`/borrowing`, payload));
    if (!response) return;

    console.log("created borrowing:", response.data);

    load(id);
  };

  const available = getAvailableCount(bookItems, borrowings);

  return (
    <Stack direction="column" spacing={2}>
      <Typography component="h1" variant="h3">
        <BookInformationText book={book} />
      </Typography>
      <img
        src={`/${book.image}`}
        alt={book.title}
        height={500}
        style={{ objectFit: "contain" }}
      />
      <Typography component="h2" variant="h4">
        Items
      </Typography>
      <BookDetailsItemsTable book={book} borrowings={borrowings} />
      <Box>
        <Button
          variant="contained"
          onClick={borrowBook}
          disabled={available <= 0}
        >
          Borrow
        </Button>
      </Box>
      <Divider />
      <Typography component="h2" variant="h4">
        Details
      </Typography>
      <BookDetailsTable book={book} />
    </Stack>
  );
};
