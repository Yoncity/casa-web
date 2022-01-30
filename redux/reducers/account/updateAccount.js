import * as types from "../../actionTypes/account/updateAccount";
import initialState from "../../initialState";

const updateAccount = (
  state = initialState.updateAccount,
  { type, payload }
) => {
  switch (type) {
    case types.UPDATE_ACCOUNT_START:
      return { loading: true, error: null, data: null };
    case types.UPDATE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        error: null,
        data: payload.data,
      };
    case types.UPDATE_ACCOUNT_ERROR:
      return {
        loading: false,
        error: payload.error,
        data: null,
      };
    default:
      return state;
  }
};

export default updateAccount;
