import * as types from "../../actionTypes/statistics/userStatistics";
import server from "../../../middlewares/axios";

const getStatisticsStarted = () => ({
  type: types.GET_USER_STATISTICS_START,
});
const getStatisticsSuccess = (data) => ({
  type: types.GET_USER_STATISTICS_SUCCESS,
  payload: { data },
});
const getStatisticsError = (error) => ({
  type: types.GET_USER_STATISTICS_ERROR,
  payload: { error },
});

const getStatistics = (address) => async (dispatch) => {
  dispatch(getStatisticsStarted());

  try {
    const res = await server.get(`/statistics/${address}?full=true`);

    const { status, message, data } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(getStatisticsSuccess(data));
  } catch (error) {
    dispatch(getStatisticsError(error.message));
  }
};

export default getStatistics;
