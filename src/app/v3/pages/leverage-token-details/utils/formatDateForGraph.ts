export const formatDate = (date: Date, includeTime = false, includeYear = false) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: includeYear ? "numeric" : undefined,
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return date.toLocaleDateString(undefined, options);
};
