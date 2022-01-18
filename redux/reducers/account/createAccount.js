import * as types from "../../actionTypes/account/createAccount";
import initialState from "../../initialState";

const createAccount = (
  state = initialState.createAccount,
  { type, payload }
) => {
  switch (type) {
    case types.CREATE_ACCOUNT_START:
      return { loading: true, error: null, data: null, pending: false };
    case types.CREATE_ACCOUNT_PENDING:
      return { loading: false, error: null, data: null, pending: true };
    case types.CREATE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        error: null,
        data: payload.data,
        pending: false,
      };
    case types.CREATE_ACCOUNT_ERROR:
      return {
        loading: false,
        error: payload.error,
        data: null,
        pending: false,
      };
    default:
      return state;
  }
};

export default createAccount;
