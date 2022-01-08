import * as types from "../../actionTypes/account/getAccountss";

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

const getAccounts = () => async (dispatch, callback) => {
  dispatch(getAccountsStarted());
  try {
    dispatch(
      getAccountsSuccess({
        /* data comes here */
      })
    );
  } catch (error) {
    dispatch(getAccountsError(error.message));
  }
};

export default getAccounts;
