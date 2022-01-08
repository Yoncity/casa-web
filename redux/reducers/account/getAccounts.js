import * as types from "../../actionTypes/account/getAccounts";
import initialState from "../../initialState";

const getAccounts = (state = initialState.getAccounts, { type, payload }) => {
  switch (type) {
    case types.GET_ACCOUNT_START:
      return { loading: true, error: null, data: null };
    case types.GET_ACCOUNT_SUCCESS:
      return { loading: false, error: null, data: payload.data };
    case types.GET_ACCOUNT_ERROR:
      return { loading: false, error: payload.error, data: null };
    default:
      return state;
  }
};

export default getAccounts;
