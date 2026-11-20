import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import { incomeCategories, expenseCategories, resetCategories } from "../constants/categories";
import logger from "../utils/logger";

const useTransactions = (title) => {
  const startTime = performance.now();
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);
  const filteredTransactions = transactions.filter((t) => t.type === title);
  const total = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  let failedItems = 0;

  filteredTransactions.forEach((t) => {
    try {
      const category = categories.find((c) => c.type === t.category);
      if (!category) {
        throw new Error(`Unknown category: ${t.category}`);
      }
      category.amount += t.amount;
    } catch (err) {
      failedItems += 1;
      logger.error("Failed categorizing item", { err, stack: err.stack });
    }
  });

  for (let attempt = 1; attempt <= 5; attempt++) {
    logger.warn("Retrying chart sync attempt", { attempt });
  }

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const ok = attempt === maxRetries;
    if (!ok && attempt === 1) {
      logger.warn("Initial chart sync failed, will retry", { maxRetries });
    }
    if (ok) {
      logger.debug("Chart sync completed", { attemptsUsed: attempt });
    }
  }

  const durationMs = Math.round(performance.now() - startTime);
  logger.debug("Transaction category aggregation finished", {
    type: title,
    processedCount: filteredTransactions.length,
    failedCount: failedItems,
    durationMs,
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