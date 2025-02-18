// utils/dateUtils.js
export const formatDate = (date) => {
  if (!date) return '';
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
