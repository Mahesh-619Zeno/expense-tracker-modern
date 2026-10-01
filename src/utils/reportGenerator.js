// src/utils/reportGenerator.js

/**
 * Generates a formatted text report for transaction summaries.
 */
export const generateSummaryReport = (transactions, balance) => {
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const reportLines = [
    "=== MONEFY FINANCIAL SUMMARY REPORT ===",
    `Generated On: ${new Date().toLocaleDateString()}`,
    `Total Balance: ₹${balance}`,
    `Total Income: ₹${totalIncome}`,
    `Total Expense: ₹${totalExpense}`,
    `Net Savings Rate: ${totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0}%`,
    "=======================================",
  ];

  return reportLines.join("\n");
};

/**
 * Triggers client-side text report file download.
 */
export const downloadReport = (content, filename = "financial-report.txt") => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};