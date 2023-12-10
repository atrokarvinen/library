import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "../core/formatDate";
import { Book } from "./book";

type Props = {
  book: Book;
};

export const BookDetailsItemsTable = ({ book }: Props) => {
  const items = book.bookItems.map((item) => {
    return {
      libraryName: item.library.name,
      status: item.borrowing ? "Unavailable" : "Available",
      expirationDate: formatDate(item.borrowing?.end),
    };
  });

  const tHeadBgColor = "var(--mui-palette-primary-main)";
  const tHeadColor = "var(--mui-palette-primary-contrastText)";

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: tHeadBgColor }}>
            <TableCell sx={{ color: tHeadColor }}>Library</TableCell>
            <TableCell sx={{ color: tHeadColor }}>Status</TableCell>
            <TableCell sx={{ color: tHeadColor }}>Expiration date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.libraryName}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.expirationDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
