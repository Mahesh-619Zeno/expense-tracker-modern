// src/components/Analytics/ExportModal/ExportModal.jsx
import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { ExpenseTrackerContext } from "../../../context/context";
import { generateSummaryReport, downloadReport } from "../../../utils/reportGenerator";

const ExportModal = ({ open, onClose }) => {
  const { transactions, balance } = useContext(ExpenseTrackerContext);

  const handleExport = () => {
    const reportText = generateSummaryReport(transactions, balance);
    downloadReport(reportText, `monefy-report-${Date.now()}.txt`);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Export Financial Summary</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Generate a detailed text summary of your total balance, income, and expense totals.
        </Typography>
        <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1, border: "1px solid #e0e0e0" }}>
          <Typography variant="caption" display="block">
            Total Transactions: {transactions.length}
          </Typography>
          <Typography variant="caption" display="block">
            Current Balance: ₹{balance}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleExport} variant="contained" color="primary">Download Report</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportModal;