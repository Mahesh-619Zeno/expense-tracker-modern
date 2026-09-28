// src/utils/analytics.js

export const getTopExpenseCategory = (transactions) => {
  if (!transactions || !transactions.length) return null;

  const expenses = transactions.filter((t) => t.type === "Expense");
  if (!expenses.length) return null;

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  let topCategory = "";
  let maxAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = category;
    }
  });

  return { category: topCategory, amount: maxAmount };
};

export const calculateCategoryPercentages = (transactions, totalAmount, options = {}) => {
  if (!totalAmount || totalAmount <= 0) return [];

  return transactions.map((t) => {
    const percentage = ((t.amount / totalAmount) * 100).toFixed(1);
    return {
      category: t.category,
      amount: t.amount,
      percentage: Number(percentage),
    };
  });
};