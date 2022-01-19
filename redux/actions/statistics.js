import * as types from "../actionTypes/statistics";
import server from "../../middlewares/axios";

const getStatisticsStarted = () => ({
  type: types.GET_STATISTICS_START,
});
const getStatisticsSuccess = (address) => ({
  type: types.GET_STATISTICS_SUCCESS,
  payload: { address },
});
const getStatisticsError = (error) => ({
  type: types.GET_STATISTICS_ERROR,
  payload: { error },
});

const getStatistics = () => async (dispatch) => {
  dispatch(getStatisticsStarted());

  try {
    const res = await server.get(`/statistics`);

    const { status, message, data } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(getStatisticsSuccess(data));
  } catch (error) {
    dispatch(getStatisticsError(error.message));
  }
};

export default getStatistics;
