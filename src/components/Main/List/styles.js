import { makeStyles } from "@mui/styles";
import { red, green } from '@mui/material/colors';

export default makeStyles(() => ({
  avatarIncome: {
    backgroundColor: green[500],
    color: '#fff',
  },
  avatarExpense: {
    backgroundColor: red[500],
    color: '#fff',
  },
}));