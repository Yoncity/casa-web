import { combineReducers } from "redux";
import authenticate from "./auth";
import statistics from "./statistics";

import createAccount from "./account/createAccount";
import getAccounts from "./account/getAccounts";

const reducers = combineReducers({
  authenticate,
  statistics,
  createAccount,
  getAccounts,
});

export default reducers;
