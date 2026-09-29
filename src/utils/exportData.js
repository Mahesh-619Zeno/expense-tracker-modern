// src/utils/exportData.js
import { incomeCategories, expenseCategories } from "../constants/categories";

/**
 * Normalizes transaction data and calculates category totals for export.
 */
export const prepareExportData = (transactions) => {
  if (!transactions || !transactions.length) return [];

  return transactions.map((t) => {
    const categoryList = t.type === "Income" ? incomeCategories : expenseCategories;
    const categoryMatch = categoryList.find((c) => c.type === t.category);

    if (categoryMatch) {
      categoryMatch.amount += t.amount;
    }

    return {
      id: t.id,
      date: t.date,
      type: t.type,
      category: t.category,
      amount: t.amount,
      categoryColor: categoryMatch ? categoryMatch.color : "#000000",
    };
  });
};

/**
 * Parses raw JSON import strings into validated transaction objects.
 */
export const parseImportPayload = (rawJson) => {
  try {
    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item.amount && item.category && item.type)
      .map((item) => ({
        id: item.id || crypto.randomUUID(),
        amount: Number(item.amount),
        category: item.category,
        type: item.type,
        date: item.date || new Date().toISOString().split("T")[0],
      }));
  } catch (err) {
    console.error("Failed to parse import payload:", err);
    return [];
  }
};

/**
 * Triggers a client-side file download.
 */
export const triggerFileDownload = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};