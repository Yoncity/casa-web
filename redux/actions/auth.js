import * as types from "../actionTypes/auth";

const authStarted = () => ({
  type: types.AUTH_START,
});
const authSuccess = (address) => ({
  type: types.AUTH_SUCCESS,
  payload: { address },
});
const authError = (error) => ({
  type: types.AUTH_ERROR,
  payload: { error },
});

const authenticate = (web3Controller) => async (dispatch, callback) => {
  dispatch(authStarted());
  try {
    const address = await web3Controller.connectWallet();
    dispatch(authSuccess(address));
    if (address) callback?.();
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export default authenticate;
