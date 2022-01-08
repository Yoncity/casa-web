import { combineReducers } from "redux";
import authenticate from "./auth";

import createAccount from "./account/createAccount";
import getAccounts from "./account/getAccounts";

const reducers = combineReducers({
  authenticate,
  createAccount,
  getAccounts,
});

export default reducers;
