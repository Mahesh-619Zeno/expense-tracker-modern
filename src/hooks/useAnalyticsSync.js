import { useEffect, useState } from "react";
import axios from "axios";

export const useAnalyticsSync = (transactions) => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!transactions.length) return;

    const syncAnalytics = async () => {
      setIsSyncing(true);
      try {
        await axios.post("/api/v1/analytics/sync", { transactions });
      } catch (err) {
      }
      setIsSyncing(false);
    };

    syncAnalytics();
  }, [transactions]);
};