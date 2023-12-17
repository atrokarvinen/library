import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import { formatDate } from "../core/formatDate";
import { Book } from "../home/book";
import { BookInformationText } from "../home/bookInformationText";
import { Borrowing } from "../home/borrowing";
import { NoBorrowings } from "./noBorrowings";

type BorrowingListProps = {
  books: Book[];
  borrowings: Borrowing[];
  onReturnBook?(borrowingId: number): void;
  onExtendBorrowing?(borrowingId: number): void;
};

export const BorrowingList = ({
  books,
  borrowings,
  onReturnBook,
  onExtendBorrowing,
}: BorrowingListProps) => {
  if (borrowings.length === 0) {
    return <NoBorrowings />;
  }

  return (
    <Grid container>
      {borrowings.map((borrowing) => {
        const book = books.find((book) => book.id === borrowing.bookId);
        if (!book) {
          return <div>No book found</div>;
        }
        return (
          <Grid key={borrowing.id} item>
            <Card data-testid="borrowed-item" sx={{ p: 1, width: 200 }}>
              <CardMedia
                component="img"
                image={`/${book.image}`}
                alt={book.title}
              />
              <CardContent>
                <Stack spacing={1} justifyContent="space-between" height="100%">
                  <BookInformationText book={book} />
                  <div>
                    <span>{formatDate(borrowing.start)}</span>
                    <span> - </span>
                    <span>{formatDate(borrowing.end)}</span>
                  </div>
                </Stack>
              </CardContent>
              {onReturnBook && onExtendBorrowing && (
                <CardActionArea>
                  <Button
                    variant="contained"
                    onClick={() => onReturnBook(borrowing.id)}
                  >
                    Return
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onExtendBorrowing(borrowing.id)}
                  >
                    Extend
                  </Button>
                </CardActionArea>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
