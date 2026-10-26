// src/utils/exportToCSV.js

/**
 * Converts transaction data into a downloadable CSV file.
 * @param {Array} transactions - Array of transaction objects
 */
export const exportToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) return;

  // Define headers
  const headers = ["ID", "Type", "Category", "Amount (INR)", "Date"];

  // Escape special characters (commas, double quotes) in fields
  const escapeCSV = (field) => {
    if (field === null || field === undefined) return '""';
    const stringField = String(field);
    // If field contains comma, quote, or newline, wrap in quotes and double up existing quotes
    if (/[",\n\r]/.test(stringField)) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  // Build CSV rows
  const rows = transactions.map((t) => [
    escapeCSV(t.id),
    escapeCSV(t.type),
    escapeCSV(t.category),
    escapeCSV(t.amount),
    escapeCSV(t.date),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create a Blob with UTF-8 encoding
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Trigger browser download
  const link = document.createElement("a");
  const today = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `monefy_transactions_${today}.csv`);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};