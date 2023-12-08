import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link as MuiLink,
} from "@mui/material";
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
    <Card sx={{ p: 1, width: 300 }}>
      <CardActionArea>
        <MuiLink component={Link} to={`/books/${book.id}`} underline="none">
          <CardMedia
            component="img"
            image={book.image}
            alt={book.title}
            height={300}
          />
          <CardContent sx={{ height: 50 }}>
            <BookInformation book={book} />
          </CardContent>
        </MuiLink>
      </CardActionArea>
    </Card>
  );
};
