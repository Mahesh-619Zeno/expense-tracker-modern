// src/components/Audit/ReconciliationPanel/ReconciliationPanel.jsx
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Box, Button, Chip, Stack } from "@mui/material";
import { ExpenseTrackerContext } from "../../../context/context";
import { reconcileTransactionLedger, reconcileCategoryTotals } from "../../../utils/reconciliationEngine";
import { calculateMonthlyReconciliationTotal } from "../../../utils/backupManager";
import AuditModal from "../AuditModal/AuditModal";

const ReconciliationPanel = () => {
  const { transactions, balance } = useContext(ExpenseTrackerContext);
  const [auditOpen, setAuditOpen] = useState(false);

  const { isReconciled, discrepancy } = reconcileTransactionLedger(transactions, balance);
  const monthlyExpenseTotal = calculateMonthlyReconciliationTotal(transactions);

  const handleRunCategoryCheck = () => {
    reconcileCategoryTotals(transactions);
  };

  return (
    <Card sx={{ mt: 2, mb: 2, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Ledger Reconciliation & Audit</Typography>
          <Chip
            label={isReconciled ? "Ledger Reconciled" : `Discrepancy: ₹${discrepancy}`}
            color={isReconciled ? "success" : "error"}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Monthly Total Reconciled Expenses: ₹{monthlyExpenseTotal}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button size="small" variant="outlined" onClick={handleRunCategoryCheck}>
            Verify Categories
          </Button>
          <Button size="small" variant="contained" color="secondary" onClick={() => setAuditOpen(true)}>
            View Audit Logs
          </Button>
        </Stack>
      </CardContent>

      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </Card>
  );
};

export default ReconciliationPanel;