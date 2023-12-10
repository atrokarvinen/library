import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Book } from "./book";
import { BookInformationText } from "./bookInformationText";

type BookListItemProps = {
  book: Book;
};

export const BookListItem = ({ book }: BookListItemProps) => {
  const availableCount = book.bookItems.filter(
    (item) => !item.borrowing
  ).length;
  const chipLabel =
    availableCount === 0 ? "Unavailable" : `Available (${availableCount})`;
  const chipColor = availableCount === 0 ? "error" : "success";

  return (
    <Card data-testid="book-card" sx={{ p: 1, width: 300 }}>
      <CardActionArea>
        <MuiLink component={Link} to={`/books/${book.id}`} underline="none">
          <CardMedia
            component="img"
            image={`/${book.image}`}
            alt={book.title}
          />
          <CardContent sx={{ height: 75 }}>
            <Stack spacing={1} justifyContent="space-between" height="100%">
              <BookInformationText book={book} />
              <Box>
                <Chip label={chipLabel} size="small" color={chipColor} />
              </Box>
            </Stack>
          </CardContent>
        </MuiLink>
      </CardActionArea>
    </Card>
  );
};
