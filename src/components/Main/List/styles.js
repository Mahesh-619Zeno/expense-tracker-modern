import { makeStyles } from "@mui/styles";
import { red, green } from '@mui/material/colors';

export default makeStyles((theme) => ({
  avatarIncome: {
    backgroundColor: green[500],
    color: '#fff',
  },
  avatarExpense: {
    backgroundColor: red[500],
    color: '#fff',
  },
  listContainer: {
    maxHeight: '240px',
    overflowY: 'auto',
  },
}));