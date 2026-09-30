// src/hooks/useTransactions.js
import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import { CurrencyContext } from "../context/CurrencyContext";
import { incomeCategories, expenseCategories, resetCategories } from "../constants/categories";
import { convertCategoryTotals } from "../utils/currencyConverter";

const useTransactions = (title) => {
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);
  const { currency, rates } = useContext(CurrencyContext);

  const filteredTransactions = transactions.filter((t) => t.type === title);
  const total = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  // Mutates global categories directly for conversion chart rendering
  convertCategoryTotals(categories, filteredTransactions, currency, rates);

  const chartCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: chartCategories.map((c) => c.amount),
        backgroundColor: chartCategories.map((c) => c.color),
      },
    ],
    labels: chartCategories.map((c) => c.type),
  };

  return { total, chartData };
};

export default useTransactions;