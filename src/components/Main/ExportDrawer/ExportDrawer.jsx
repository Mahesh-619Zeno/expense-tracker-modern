import React, { useState } from "react";
import { Drawer, Box, Typography, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import { EXPORT_ENDPOINTS } from "../../../constants/analyticsConstants";

const ExportDrawer = ({ open, onClose, transactions }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    if (t.type !== "Expense") return false;
    if (!startDate || !endDate) return true;
    return t.date >= startDate && t.date <= endDate;
  });

  const handleExport = (format) => {
    const endpoint = format === "csv" ? EXPORT_ENDPOINTS.CSV : EXPORT_ENDPOINTS.JSON;
    window.open(`${endpoint}?count=${filteredTransactions.length}`, "_blank");
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Export Expense History
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Filter and download your recorded expense logs.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Transactions to Export ({filteredTransactions.length})
        </Typography>
        <List sx={{ maxHeight: 200, overflow: "auto", mb: 2, border: "1px solid #ccc", borderRadius: 1 }}>
          {filteredTransactions.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText 
                primary={item.category} 
                secondary={`₹${item.amount} - ${item.date}`} 
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="primary" fullWidth onClick={() => handleExport("csv")}>
            Export CSV
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={() => handleExport("json")}>
            Export JSON
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ExportDrawer;