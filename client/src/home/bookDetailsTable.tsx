import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { formatDate } from "../core/formatDate";
import { Book } from "./book";

type Props = {
  book: Book;
};

export const BookDetailsTable = ({ book }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{book.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>{book.author?.name ?? "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Published</TableCell>
            <TableCell>{formatDate(book.published)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pages</TableCell>
            <TableCell>{book.pages}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
