import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import style from "../styles/pages/index.module.scss";
import Web3Controller from "../helpers/Web3Controller";
import { useRouter } from "next/router";
import authenticate from "../redux/actions/auth";
import getStatistics from "../redux/actions/statistics/contractStatistics";
import getRate from "../redux/actions/rate";
import { InitialState } from "../redux/initialState";
import locales from "../constants/locale";

const Home: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [contractBalance, setContractBalance] = useState<Number>(0);
  const [totalUsers, setTotalUsers] = useState<Number>(0);

  const router = useRouter();

  const dispatch = useDispatch();

  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const { data: rate, loading: rateLoading } = useSelector(
    ({ rate }): InitialState["rate"] => rate
  );

  const {
    data: statisticsData,
    error: statisticsError,
    loading: statisticsLoading,
  } = useSelector(
    ({ contractStatistics }): InitialState["contractStatistics"] =>
      contractStatistics
  );

  async function getContractBalance(_web3Controller: Web3Controller) {
    let balance = await _web3Controller.getContractBalance();
    setContractBalance(balance);
  }

  async function getTotalUsers(_web3Controller: Web3Controller) {
    let totalUsers = await _web3Controller.getTotalUsers();
    setTotalUsers(totalUsers);
  }

  useEffect(() => {
    if (!rate && !rateLoading) {
      getRate()(dispatch);
    }

    if (
      statisticsData &&
      !statisticsData.totalUsers &&
      !statisticsData.statistics
    ) {
      getStatistics()(dispatch);
    }

    let _web3Controller: Web3Controller | null = new Web3Controller();

    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);

      getTotalUsers(_web3Controller);

      getContractBalance(_web3Controller);

      _web3Controller = null;
    }
  }, [dispatch]);

  const getStarted = async () => {
    if (web3Controller) {
      if (address) {
        router.push("/dashboard");
      } else {
        authenticate(web3Controller)(dispatch, () => router.push("/dashboard"));
      }
    }
  };

  return (
    <Layout>
      <div className={style.home_container}>
        <div className={style.home_container__home} id="home">
          <p className={style.home_container__home__title}>
            {locales("home_title", lang)}
          </p>
          <p className={style.home_container__home__content}>
            {locales("home_info_1", lang)}
          </p>
          <p className={style.home_container__home__content}>
            {locales("home_info_2", lang)}
          </p>

          <button
            className={`${style.button} ${style.button_accent} ${style.home_container__home__content__button}`}
            onClick={() => getStarted()}
          >
            <div
              className={`${
                style.home_container__home__content__button__loader
              } ${loading ? style.show_loader : ""}`}
            ></div>

            {address
              ? locales("home_getting_goto_dashboard_button", lang)
              : locales("home_getting_started_button", lang)}
          </button>

          {statisticsData &&
            statisticsData.totalUsers &&
            statisticsData.statistics && (
              <div className={style.home_container__home__stats}>
                <div className={style.home_container__home__stats__data}>
                  <p className={style.home_container__home__stats__data__title}>
                    {locales("home_total_users", lang)}
                  </p>
                  <p
                    className={style.home_container__home__stats__data__content}
                  >
                    {statisticsData.totalUsers}
                  </p>
                </div>

                <div className={style.home_container__home__stats__data}>
                  <p className={style.home_container__home__stats__data__title}>
                    {locales("home_locked_volume", lang)}
                  </p>
                  <p
                    className={style.home_container__home__stats__data__content}
                  >
                    {web3Controller?.convertFromWeiToEth(
                      statisticsData.statistics.currentLockedVolume
                    )}{" "}
                    ETH
                  </p>
                </div>
              </div>
            )}
        </div>
        <div className={style.home_container__how_it_works} id="how_it_works">
          <p className={style.home_container__how_it_works__title}>
            {locales("how_it_works_title", lang)}
          </p>

          <div className={style.home_container__how_it_works__step}>
            <p className={style.home_container__how_it_works__step__title}>
              {locales("how_it_works_step_1", lang)}
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                {locales("how_it_works_step_1_info", lang)}
              </p>
              <div
                className={
                  style.home_container__how_it_works__step__description__details
                }
              >
                <div
                  className={
                    style.home_container__how_it_works__step__description__details__images
                  }
                >
                  <Image
                    src="/assets/icons/trustwallet.png"
                    alt="Trustwallet icon"
                    width={56}
                    height={56}
                  />
                </div>
                <div
                  className={
                    style.home_container__how_it_works__step__description__details__images
                  }
                >
                  <Image
                    src="/assets/icons/metamask.png"
                    alt="Metamask icon"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.home_container__how_it_works__step}>
            <p className={style.home_container__how_it_works__step__title}>
              {locales("how_it_works_step_2", lang)}
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                {locales("how_it_works_step_2_info", lang)}
              </p>
            </div>
          </div>

          <div className={style.home_container__how_it_works__step}>
            <p className={style.home_container__how_it_works__step__title}>
              {locales("how_it_works_step_3", lang)}
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                {locales("how_it_works_step_3_info", lang)}
              </p>
            </div>
          </div>

          <div className={style.home_container__how_it_works__step}>
            <p
              className={`${style.home_container__how_it_works__step__title} ${style.home_container__how_it_works__step__last}`}
            >
              {locales("how_it_works_step_4", lang)}
            </p>
            <div
              className={`${style.home_container__how_it_works__step__description} ${style.home_container__how_it_works__step__last}`}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                {locales("how_it_works_step_4_info", lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
