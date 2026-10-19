import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import { incomeCategories, expenseCategories, resetCategories } from "../constants/categories";

const useTransactions = (title) => {
  // Reset all category amounts
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);

  // Filter transactions based on title: Income or Expense
  const filteredTransactions = transactions.filter((t) => t.type === title);

  // Calculate total amount
  const total = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  // Pick categories based on type
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  // Assign amounts to categories
  filteredTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });

  // Keep only categories with amount > 0
  const chartCategories = categories.filter((c) => c.amount > 0);

  // ChartJS data format
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