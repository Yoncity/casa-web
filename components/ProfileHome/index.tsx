import { useEffect } from "react";
import Web3Controller from "../../helpers/Web3Controller";
import { useSelector, useDispatch } from "react-redux";
import StatCard from "./StatCard";
import style from "./index.module.scss";
import { InitialState } from "../../redux/initialState";
import getStatistics from "../../redux/actions/statistics/userStatistics";
import getRate from "../../redux/actions/rate";
import Loader from "../Loader";
import locales from "../../constants/locale";

type Props = {
  web3Controller: Web3Controller | undefined;
};
const ProfileHome: React.FC<Props> = ({ web3Controller }) => {
  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

  const { address } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const { data: rate, loading: rateLoading } = useSelector(
    ({ rate }): InitialState["rate"] => rate
  );

  const { data, error, loading } = useSelector(
    ({ userStatistics }): InitialState["userStatistics"] => userStatistics
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!rate && !rateLoading) {
      getRate()(dispatch);
    }
  }, [dispatch, rate, rateLoading]);

  useEffect(() => {
    if (
      data &&
      !data.statistics &&
      !data.accounts &&
      !data.transactions &&
      address
    ) {
      getStatistics(address)(dispatch);
    }
  }, [dispatch, address, data]);

  const body = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <p className="error">{error}</p>;
    }

    if (data && Object.keys(data).length === 3) {
      return (
        <>
          <div className={style.profile_home_container__stat}>
            <StatCard title={locales("dashboard_home_statistics_total", lang)}>
              <div className={style.profile_home_container__stat__data}>
                <p>
                  {web3Controller?.convertFromWeiToEth(
                    data.statistics.totalLockedVolume
                  )}{" "}
                  ETH
                </p>
                {rate && (
                  <p>
                    ${" "}
                    {Number(rate) *
                      Number(
                        web3Controller?.convertFromWeiToEth(
                          data.statistics.totalLockedVolume
                        )
                      )}
                  </p>
                )}
              </div>
            </StatCard>
            <StatCard
              title={locales("dashboard_home_statistics_current", lang)}
            >
              <div className={style.profile_home_container__stat__data}>
                <p>
                  {web3Controller?.convertFromWeiToEth(
                    data.statistics.currentLockedVolume
                  )}{" "}
                  ETH
                </p>
                {rate && (
                  <p>
                    ${" "}
                    {Number(rate) *
                      Number(
                        web3Controller?.convertFromWeiToEth(
                          data.statistics.currentLockedVolume
                        )
                      )}
                  </p>
                )}
              </div>
            </StatCard>
          </div>

          <div className={style.profile_home_container__stat}>
            <StatCard title={locales("dashboard_home_accounts_total", lang)}>
              <div className={style.profile_home_container__stat__data}>
                <p>{data.accounts.total}</p>
              </div>
            </StatCard>
            <StatCard title={locales("dashboard_home_accounts_open", lang)}>
              <div className={style.profile_home_container__stat__data}>
                <p>{data.accounts.open}</p>
              </div>
            </StatCard>
            <StatCard title={locales("dashboard_home_accounts_closed", lang)}>
              <div className={style.profile_home_container__stat__data}>
                <p>{data.accounts.closed}</p>
              </div>
            </StatCard>
          </div>

          <div className={style.profile_home_container__stat}>
            <StatCard
              title={locales("dashboard_home_transactions_total", lang)}
            >
              <div className={style.profile_home_container__stat__data}>
                <p>{data.transactions.total}</p>
              </div>
            </StatCard>
            <StatCard
              title={locales("dashboard_home_transactions_successful", lang)}
            >
              <div className={style.profile_home_container__stat__data}>
                <p>{data.transactions.successful}</p>
              </div>
            </StatCard>
            <StatCard
              title={locales("dashboard_home_transactions_failed", lang)}
            >
              <div className={style.profile_home_container__stat__data}>
                <p>{data.transactions.failed}</p>
              </div>
            </StatCard>
          </div>
        </>
      );
    }
  };

  return <div className={style.profile_home_container}>{body()}</div>;
};

export default ProfileHome;
