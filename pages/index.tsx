import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import style from "../styles/pages/index.module.scss";
import Web3Controller from "../helpers/Web3Controller";
import { useRouter } from "next/router";
import authenticate from "../redux/actions/auth";
import getStatistics from "../redux/actions/statistics";
import { InitialState } from "../redux/initialState";

const Home: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();
  const [contractBalance, setContractBalance] = useState<Number>(0);
  const [totalUsers, setTotalUsers] = useState<Number>(0);

  const router = useRouter();

  const dispatch = useDispatch();

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const {
    data: statisticsData,
    error: statisticsError,
    loading: statisticsLoading,
  } = useSelector(({ statistics }): InitialState["statistics"] => statistics);

  async function getContractBalance(_web3Controller: Web3Controller) {
    let balance = await _web3Controller.getContractBalance();
    setContractBalance(balance);
  }

  async function getTotalUsers(_web3Controller: Web3Controller) {
    let totalUsers = await _web3Controller.getTotalUsers();
    setTotalUsers(totalUsers);
  }

  useEffect(() => {
    // getStatistics()(dispatch);

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
        <div className={style.home_container__home}>
          <p className={style.home_container__home__title}>
            Resist the temptation to SELL
          </p>
          <p className={style.home_container__home__content}>
            Are you tired of selling your crypto at a bad time, try CASA.
          </p>
          <p className={style.home_container__home__content}>
            Casa gives you the option to lock your crypto for your chosen amount
            of time, so you can avoid making hastey decisions.
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
            {address ? "Goto Dashboard" : "GET STARTED"}
          </button>

          <div className={style.home_container__home__stats}>
            <div className={style.home_container__home__stats__data}>
              <p className={style.home_container__home__stats__data__title}>
                Total Users
              </p>
              <p className={style.home_container__home__stats__data__content}>
                {totalUsers}
              </p>
            </div>

            <div className={style.home_container__home__stats__data}>
              <p className={style.home_container__home__stats__data__title}>
                Locked Volume
              </p>
              <p className={style.home_container__home__stats__data__content}>
                {contractBalance}
              </p>
            </div>
          </div>
        </div>
        <div className={style.home_container__how_it_works}>
          <p className={style.home_container__how_it_works__title}>
            How it works?
          </p>

          <div className={style.home_container__how_it_works__step}>
            <p className={style.home_container__how_it_works__step__title}>
              CONNECT
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                Connect you wallet with one of the following supported wallets.
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
              LOCK
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                Lock your crypto funds in an account for a specified amount of
                time of your choosing.
              </p>
            </div>
          </div>

          <div className={style.home_container__how_it_works__step}>
            <p className={style.home_container__how_it_works__step__title}>
              WAIT
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                Wait for the desired time that you would wish to lock your funds
              </p>
            </div>
          </div>

          <div className={style.home_container__how_it_works__step}>
            <p
              className={`${style.home_container__how_it_works__step__title} ${style.home_container__how_it_works__step__last}`}
            >
              WITHDRAW
            </p>
            <div
              className={style.home_container__how_it_works__step__description}
            >
              <p
                className={
                  style.home_container__how_it_works__step__description__content
                }
              >
                Once the lockdown period is over, withdraw your money
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
