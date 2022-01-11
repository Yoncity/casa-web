import * as types from "../../actionTypes/account/getAccountss";
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

const getAccounts = () => async (dispatch) => {
  dispatch(getAccountsStarted());
  try {
    const res = await server.get("/accounts");

    const { status, message, data } = res.data;
    if (status !== 200) throw new Error(message);

    console.log("🚀 --- getAccounts --- data", data);

    dispatch(getAccountsSuccess(data));
  } catch (error) {
    dispatch(getAccountsError(error.message));
  }
};

export default getAccounts;
