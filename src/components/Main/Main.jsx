// src/components/Main/Main.jsx
import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import { ExpenseTrackerContext } from "../../context/context";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import InfoCard from "../InfoCard";
import CustomizedSnackbar from "../Snackbar/Snackbar";
import {
  prepareExportData,
  parseImportPayload,
  triggerFileDownload,
} from "../../utils/exportData";

const Main = () => {
  const classes = useStyles();
  const { balance, transactions, addTransaction } = useContext(ExpenseTrackerContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTransactionCreated = () => {
    setSnackbarOpen(true);
  };

  const handleExportJSON = () => {
    const dataToExport = prepareExportData(transactions);
    const jsonString = JSON.stringify(dataToExport, null, 2);
    triggerFileDownload(
      jsonString,
      `transactions-backup-${Date.now()}.json`,
      "application/json"
    );
  };

  const handleExportCSV = () => {
    const dataToExport = prepareExportData(transactions);
    if (!dataToExport.length) return;

    const headers = ["ID", "Date", "Type", "Category", "Amount", "CategoryColor"];
    const rows = dataToExport.map((t) =>
      [t.id, t.date, t.type, t.category, t.amount, t.categoryColor].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    triggerFileDownload(csvContent, `transactions-${Date.now()}.csv`, "text/csv");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const items = parseImportPayload(event.target.result);
      items.forEach((item) => addTransaction(item));
      setSnackbarOpen(true);
    };
    reader.readAsText(file);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ₹{balance}
        </Typography>
        <InfoCard />
        <Divider className={classes.divider} />
        <Form onTransactionCreated={handleTransactionCreated} />
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleExportJSON}
                disabled={!transactions.length}
              >
                Export JSON
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={handleExportCSV}
                disabled={!transactions.length}
              >
                Export CSV
              </Button>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Import
                <input
                  type="file"
                  hidden
                  accept=".json"
                  onChange={handleFileUpload}
                />
              </Button>
            </Stack>
            <List />
          </Grid>
        </Grid>
      </CardContent>
      <CustomizedSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} />
    </Card>
  );
};

export default Main;