import * as types from "../../actionTypes/account/getAccounts";
import server from "../../../middlewares/axios";

const getAccountsStarted = () => ({
  type: types.GET_ACCOUNT_START,
});
const getAccountsSuccess = (data) => ({
  type: types.GET_ACCOUNT_SUCCESS,
  payload: { data },
});
const getAccountsError = (error) => ({
  type: types.GET_ACCOUNT_ERROR,
  payload: { error },
});

export const addNewAccount = (data) => ({
  type: types.ADD_NEW_ACCOUNT,
  payload: { data },
});

const getAccounts = (address) => async (dispatch) => {
  dispatch(getAccountsStarted());
  try {
    const res = await server.get(`/accounts/${address}`);

    const { status, message, data } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(getAccountsSuccess(data));
  } catch (error) {
    dispatch(getAccountsError(error.message));
  }
};

export default getAccounts;
