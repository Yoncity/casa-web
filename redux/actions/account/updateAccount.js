import * as types from "../../actionTypes/account/updateAccount";
import axios from "../../../middlewares/axios";

const updateAccountStarted = () => ({
  type: types.UPDATE_ACCOUNT_START,
});

export const updateAccountPending = () => ({
  type: types.UPDATE_ACCOUNT_PENDING,
});

const updateAccountSuccess = (data) => ({
  type: types.UPDATE_ACCOUNT_SUCCESS,
  payload: { data },
});

const updateAccountError = (error) => ({
  type: types.UPDATE_ACCOUNT_ERROR,
  payload: { error },
});

const updateAccount = (account, data) => async (dispatch) => {
  dispatch(updateAccountStarted());
  try {
    const res = await axios.put(
      `/accounts/${account.owner}/${account.accountNumber}`,
      data
    );

    const { status, message } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(updateAccountSuccess(data));
  } catch (error) {
    dispatch(updateAccountError(error.message));
  }
};

export default updateAccount;
