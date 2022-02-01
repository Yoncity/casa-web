import * as types from "../actionTypes/transactions";
import server from "../../middlewares/axios";

const getTransactionsStarted = () => ({
  type: types.GET_TRANSACTIONS_START,
});
const getTransactionsSuccess = (data) => ({
  type: types.GET_TRANSACTIONS_SUCCESS,
  payload: { data },
});
const getTransactionsError = (error) => ({
  type: types.GET_TRANSACTIONS_ERROR,
  payload: { error },
});

const getTransactions = (address) => async (dispatch) => {
  dispatch(getTransactionsStarted());

  try {
    const res = await server.get(`/transactions/${address}`);

    const { status, message, data } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(getTransactionsSuccess(data));
  } catch (error) {
    dispatch(getTransactionsError(error.message));
  }
};

export default getTransactions;
