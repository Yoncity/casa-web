import * as types from "../../actionTypes/statistics/contractStatistics";
import initialState from "../../initialState";

const getStatistics = (
  state = initialState.contractStatistics,
  { type, payload }
) => {
  switch (type) {
    case types.GET_CONTRACT_STATISTICS_START:
      return { loading: true, error: null, data: null };
    case types.GET_CONTRACT_STATISTICS_SUCCESS:
      return { loading: false, error: null, data: payload.data };
    case types.GET_CONTRACT_STATISTICS_ERROR:
      return { loading: false, error: payload.error, data: null };
    default:
      return state;
  }
};

export default getStatistics;
