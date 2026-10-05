// src/components/Audit/AuditModal/AuditModal.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, Chip, Box } from "@mui/material";
import { getAuditLogs } from "../../../services/auditService";

const AuditModal = ({ open, onClose }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchedLogs = getAuditLogs();
      setLogs(fetchedLogs.slice(0, 15));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>System Audit Trail Logs</DialogTitle>
      <DialogContent dividers>
        {!logs.length ? (
          <Typography variant="body2" color="textSecondary" align="center">
            No audit event logs recorded.
          </Typography>
        ) : (
          <List size="small">
            {logs.map((log) => (
              <ListItem key={log.id} divider>
                <ListItemText
                  primary={log.action}
                  secondary={`${new Date(log.timestamp).toLocaleString()} - ${log.details}`}
                />
                <Chip label="Log" size="small" variant="outlined" />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuditModal;