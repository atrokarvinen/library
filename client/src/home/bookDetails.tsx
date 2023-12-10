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
import { axios } from "../core/axios";
import { useApiRequest } from "../core/useApiRequest";
import { Book } from "./book";
import { BookDetailsItemsTable } from "./bookDetailsItemsTable";
import { BookDetailsTable } from "./bookDetailsTable";
import { BookInformationText } from "./bookInformationText";

export const BookDetails = () => {
  const { request } = useApiRequest();
  const routeParams = useParams();
  const id = Number(routeParams.id);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    getBook();
  }, [id]);

  const getBook = async () => {
    const response = await axios.get<Book>(`/books/${id}`);
    setBook(response.data);
  };

  if (!book) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  const borrowBook = async () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 14);
    const borrowing = { bookId: id, end, start };
    const response = await request(axios.post(`/borrowings`, borrowing));
    if (!response) return;

    console.log("created borrowing:", response.data);

    await getBook();
  };

  const available = book.bookItems.filter((item) => !item.borrowing).length;

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
      <BookDetailsItemsTable book={book} />
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
