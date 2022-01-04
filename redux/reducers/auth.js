import * as types from "../actionTypes/auth";
import initialState from "../initialState";

const authenticate = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case types.AUTH_START:
      return { loading: true, error: null, address: null };
    case types.AUTH_SUCCESS:
      return { loading: false, error: null, address: payload.address };
    case types.AUTH_ERROR:
      return { loading: false, error: payload.error, address: null };
    default:
      return state;
  }
};

export default authenticate;
