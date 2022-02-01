import * as types from "../actionTypes/rate";
import initialState from "../initialState";

const getRate = (state = initialState.rate, { type, payload }) => {
  switch (type) {
    case types.GET_RATE_START:
      return { loading: true, error: null, data: null };
    case types.GET_RATE_SUCCESS:
      return { loading: false, error: null, data: payload.data };
    case types.GET_RATE_ERROR:
      return { loading: false, error: payload.error, data: null };
    default:
      return state;
  }
};

export default getRate;
