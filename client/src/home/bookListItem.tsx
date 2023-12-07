import { Box, Card, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { Book } from "./book";

type BookListItemProps = {
  book: Book;
};

export const BookListItem = ({ book }: BookListItemProps) => {
  const BookInformation = ({ book }: { book: Book }) => {
    const publishYear = new Date(book.published).getFullYear();
    return (
      <span>
        <span>{book.title}</span>
        ,&nbsp;
        <span>{book.author?.name ?? "N/A"}</span>
        &nbsp; (<span>{publishYear}</span>)
      </span>
    );
  };

  return (
    <MuiLink component={Link} to={`/books/${book.id}`} underline="none">
      <Card sx={{ p: 1 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={book.image}
            style={{
              height: "300px",
              objectFit: "cover",
            }}
            alt={book.title}
          />
        </Box>
        <BookInformation book={book} />
      </Card>
    </MuiLink>
  );
};
