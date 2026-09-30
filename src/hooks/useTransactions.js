import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import { incomeCategories, expenseCategories, resetCategories } from "../constants/categories";

const useTransactions = (title, config) => {
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);

  const filteredTransactions = transactions.filter((t) => t.type === title);

  const total = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  filteredTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });

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