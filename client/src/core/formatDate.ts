export const formatDate = (inputDate: string | Date | undefined) => {
  if (inputDate === undefined) return "-";
  const date = new Date(inputDate);
  const finnishDate = date.toLocaleDateString("fi-FI");
  return finnishDate;
};
