import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Account from "../components/Account";
import Web3Controller from "../helpers/Web3Controller";
import style from "../styles/pages/dashboard.module.scss";
import { InitialState } from "../redux/initialState";

const Dashboard: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let _web3Controller: Web3Controller | null = new Web3Controller();
    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);
      _web3Controller = null;
    }
  }, []);

  if (web3Controller && address) {
    web3Controller.listenToEvents(address, dispatch);
  }

  // const router = useRouter();
  // if (!address) {
  //   router.push("/");
  // }

  return (
    <div className={style.dashboard_container}>
      <div className={style.dashboard_container__header}>
        <p className={style.dashboard_container__header__title}>
          Locked Accounts
        </p>
        <button className={`${style.button} ${style.button_primary}`}>
          Lock Now
        </button>
      </div>

      <div className={style.dashboard_container__content}>
        <Account
          status={false}
          statusTitle="WITHDRAW"
          statusValue="Lock period has expired"
        />
        <Account
          status={true}
          statusTitle="LOCKED"
          statusValue="Unlocks in 6 months"
        />
      </div>
    </div>
  );
};

export default Dashboard;
