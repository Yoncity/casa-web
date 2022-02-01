import * as types from "../actionTypes/rate";
import server from "../../middlewares/axios";

const getRateStarted = () => ({
  type: types.GET_RATE_START,
});
const getRateSuccess = (data) => ({
  type: types.GET_RATE_SUCCESS,
  payload: { data },
});
const getRateError = (error) => ({
  type: types.GET_RATE_ERROR,
  payload: { error },
});

const getRate = (address) => async (dispatch) => {
  dispatch(getRateStarted());

  try {
    const data = await fetch(
      "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
    );

    const result = await data.json();

    if (!result?.data?.rates?.USD)
      throw new Error("Something went wrong, try again later.");

    dispatch(getRateSuccess(result?.data?.rates?.USD));
  } catch (error) {
    dispatch(getRateError(error.message));
  }
};

export default getRate;
