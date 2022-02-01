import * as types from "../../actionTypes/statistics/contractStatistics";
import server from "../../../middlewares/axios";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const getStatisticsStarted = () => ({
  type: types.GET_CONTRACT_STATISTICS_START,
});
const getStatisticsSuccess = (data) => ({
  type: types.GET_CONTRACT_STATISTICS_SUCCESS,
  payload: { data },
});
const getStatisticsError = (error) => ({
  type: types.GET_CONTRACT_STATISTICS_ERROR,
  payload: { error },
});

const getStatistics = () => async (dispatch) => {
  dispatch(getStatisticsStarted());

  try {
    // const res = await server.get(
    //   `/statistics/${CONTRACT_ADDRESS.toLowerCase()}`
    // );

    const res = await server.get(
      `/statistics/0xa4b57d69d4979defb9f41ea22446ca0bf5644be1`
    );

    const { status, message, data } = res.data;

    if (status !== 200) throw new Error(message);

    dispatch(getStatisticsSuccess(data));
  } catch (error) {
    dispatch(getStatisticsError(error.message));
  }
};

export default getStatistics;
