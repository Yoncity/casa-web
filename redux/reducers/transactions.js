import * as types from "../actionTypes/transactions";
import initialState from "../initialState";

const getTransactions = (
  state = initialState.transactions,
  { type, payload }
) => {
  switch (type) {
    case types.GET_TRANSACTIONS_START:
      return { loading: true, error: null, data: null };
    case types.GET_TRANSACTIONS_SUCCESS:
      return { loading: false, error: null, data: payload.data };
    case types.GET_TRANSACTIONS_ERROR:
      return { loading: false, error: payload.error, data: null };
    default:
      return state;
  }
};

export default getTransactions;
