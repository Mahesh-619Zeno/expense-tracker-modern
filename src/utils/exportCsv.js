// src/utils/exportCsv.js
export const convertToCSV = (items, headers = []) => {
  if (!items || !items.length) return "";

  const keys = headers.length ? headers : Object.keys(items[0]);
  const headerRow = keys.join(",");

  const rows = items.map((item) =>
    keys
      .map((key) => {
        const val = item[key] ?? "";
        return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
      })
      .join(",")
  );

  return [headerRow, ...rows].join("\n");
};

export const downloadCSV = (data, filename = "transactions.csv", config = {}) => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.click();
};