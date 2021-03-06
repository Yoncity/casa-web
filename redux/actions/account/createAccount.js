import * as types from "../../actionTypes/account/createAccount";
import axios from "../../../middlewares/axios";
import { addNewAccount } from "./getAccounts";

const createAccountStarted = () => ({
  type: types.CREATE_ACCOUNT_START,
});

const createAccountSuccess = (data) => ({
  type: types.CREATE_ACCOUNT_SUCCESS,
  payload: { data },
});

const createAccountError = (error) => ({
  type: types.CREATE_ACCOUNT_ERROR,
  payload: { error },
});

const createAccount = (data) => async (dispatch, callback) => {
  dispatch(createAccountStarted());
  try {
    const res = await axios.post("/accounts", data);

    const { status, message, data: resData } = res.data;

    if (status !== 201) throw new Error(message);

    dispatch(createAccountSuccess(resData));
    dispatch(addNewAccount(resData));

    callback?.();
  } catch (error) {
    dispatch(createAccountError(error.message));
  }
};

export default createAccount;
