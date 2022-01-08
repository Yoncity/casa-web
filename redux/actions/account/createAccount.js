import * as types from "../../actionTypes/account/createAccount";

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

const createAccount = (data) => async (dispatch) => {
  console.log("🚀 --- createAccount --- data", data);
  dispatch(createAccountStarted());
  try {
    dispatch(
      createAccountSuccess({
        /* data comes here */
      })
    );
  } catch (error) {
    dispatch(createAccountError(error.message));
  }
};

export default createAccount;
