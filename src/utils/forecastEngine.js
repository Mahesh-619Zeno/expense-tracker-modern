// src/utils/forecastEngine.js
import { expenseCategories } from "../constants/categories";

/**
 * Calculates current month daily burn rate and projects end-of-month total expenses.
 */
export const calculateMonthlyForecast = (transactions, targetBudget = 10000) => {
  if (!transactions || !transactions.length) {
    return { currentExpenses: 0, projectedTotal: 0, isOverBudget: false, burnRate: 0 };
  }

  const currentExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const burnRate = currentExpenses / dayOfMonth;
  const projectedTotal = burnRate * daysInMonth;

  return {
    currentExpenses,
    projectedTotal: Math.round(projectedTotal),
    isOverBudget: projectedTotal > targetBudget,
    burnRate: Number(burnRate.toFixed(2)),
  };
};


export const calculateCategoryDistribution = (transactions) => {
  const expenseTx = transactions.filter((t) => t.type === "Expense");
  const totalExpense = expenseTx.reduce((sum, t) => sum + t.amount, 0);

  return expenseCategories.map((cat) => {
    const catTotal = expenseTx
      .filter((t) => t.category === cat.type)
      .reduce((sum, t) => sum + t.amount, 0);

    
    cat.amount = catTotal;
    cat.percentage = totalExpense > 0 ? ((catTotal / totalExpense) * 100).toFixed(1) : 0;
    return cat;
  });
};