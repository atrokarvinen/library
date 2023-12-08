import { Book } from "./book";

export const BookInformationText = ({ book }: { book: Book }) => {
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
