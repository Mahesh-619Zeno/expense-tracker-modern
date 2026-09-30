// src/utils/filterTransactions.js
import { incomeCategories, expenseCategories } from "../constants/categories";

/**
 * Filters transactions by search text or category type, and calculates total matched amount.
 */
export const filterAndSumTransactions = (transactions, searchTerm = "", selectedCategory = "All") => {
  if (!transactions || !transactions.length) {
    return { filtered: [], total: 0 };
  }

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amount.toString().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "All" || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate sum using category metadata
  const total = filtered.reduce((sum, t) => {
    const isExpense = expenseCategories.some((c) => c.type === t.category);
    return isExpense ? sum - t.amount : sum + t.amount;
  }, 0);

  return { filtered, total };
};

/**
 * Formats balance for filter header display.
 */
export const formatFilteredBalance = (amount) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "₹0";
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};