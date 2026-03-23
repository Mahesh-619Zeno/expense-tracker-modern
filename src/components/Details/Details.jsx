import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import useTransactions from "../../hooks/useTransactions";

const Details = ({ title }) => {
  const { total, chartData } = useTransactions(title);

  return (
    <Card
      sx={{
        borderBottom:
          title === "Income"
            ? "10px solid rgba(4, 147, 114, 1)"
            : "10px solid rgba(139,0,0,1)",
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">₹{total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;