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
  const available = book.count - book.borrowings.length;
  const items = book.borrowings.map((borrowing) => {
    return {
      libraryName: book.library?.name ?? "N/A",
      status: "Unavailable",
      expirationDate: formatDate(borrowing.end),
    };
  });
  for (let i = 0; i < available; i++) {
    items.push({
      libraryName: book.library?.name ?? "N/A",
      status: "Available",
      expirationDate: "-",
    });
  }

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
