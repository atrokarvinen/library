import { Button, Card, Grid, Stack } from "@mui/material";
import { formatDate } from "../core/formatDate";
import { Borrowing } from "../home/borrowing";
import { NoBorrowings } from "./noBorrowings";

type BorrowingListProps = {
  borrowings: Borrowing[];
  onReturnBook?(borrowingId: number): void;
  onExtendBorrowing?(borrowingId: number): void;
};

export const BorrowingList = ({
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
        return (
          <Grid key={borrowing.id} item>
            <Card data-testid="borrowed-item">
              <dl>
                <dt>Title</dt>
                <dd>{borrowing.bookItem?.book.title}</dd>
                <dt>Author</dt>
                <dd>{borrowing.bookItem?.book.author?.name}</dd>
                <dt>Start</dt>
                <dd>{formatDate(borrowing.start)}</dd>
                <dt>End</dt>
                <dd>{formatDate(borrowing.end)}</dd>
              </dl>
              {onReturnBook && onExtendBorrowing && (
                <Stack
                  direction="row"
                  spacing={2}
                  mt={4}
                  justifyContent="flex-end"
                >
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
                </Stack>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
