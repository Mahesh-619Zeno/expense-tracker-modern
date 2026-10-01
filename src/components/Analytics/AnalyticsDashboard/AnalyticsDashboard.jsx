// src/components/Analytics/AnalyticsDashboard/AnalyticsDashboard.jsx
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Box, LinearProgress, Button, Grid, Chip } from "@mui/material";
import { ExpenseTrackerContext } from "../../../context/context";
import { calculateMonthlyForecast, calculateCategoryDistribution } from "../../../utils/forecastEngine";
import ExportModal from "../ExportModal/ExportModal";

const AnalyticsDashboard = () => {
  const { transactions } = useContext(ExpenseTrackerContext);
  const [exportOpen, setExportOpen] = useState(false);

  const forecast = calculateMonthlyForecast(transactions, 10000);
  const categoryBreakdown = calculateCategoryDistribution(transactions).filter((c) => c.amount > 0);

  const progressValue = Math.min((forecast.currentExpenses / 10000) * 100, 100);

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Monthly Budget Forecast</Typography>
          <Button size="small" variant="outlined" onClick={() => setExportOpen(true)}>
            Export Report
          </Button>
        </Box>

        <Typography variant="body2" color="textSecondary">
          Projected Spending: ₹{forecast.projectedTotal} (Daily Burn: ₹{forecast.burnRate}/day)
        </Typography>

        <Box sx={{ width: "100%", mt: 1.5, mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color={forecast.isOverBudget ? "error" : "primary"}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Top Expense Categories</Typography>
        <Grid container spacing={1}>
          {categoryBreakdown.map((cat) => (
            <Grid item key={cat.type}>
              <Chip
                label={`${cat.type}: ₹${cat.amount} (${cat.percentage}%)`}
                size="small"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </Card>
  );
};

export default AnalyticsDashboard;