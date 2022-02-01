import { combineReducers } from "redux";
import authenticate from "./auth";
import contractStatistics from "./statistics/contractStatistics";
import userStatistics from "./statistics/userStatistics";
import transactions from "./transactions";
import rate from "./rate";
import lang from "./lang";
import createAccount from "./account/createAccount";
import getAccounts from "./account/getAccounts";

const reducers = combineReducers({
  authenticate,
  contractStatistics,
  userStatistics,
  createAccount,
  getAccounts,
  transactions,
  rate,
  locale: lang,
});

export default reducers;
