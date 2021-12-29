import type { NextPage } from "next";
import Account from "../components/Account";
import style from "../styles/pages/dashboard.module.scss";

const Dashboard: NextPage = () => {
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
        <Account
          status={false}
          statusTitle="WITHDRAW"
          statusValue="Lock period has expired"
        />
      </div>
    </div>
  );
};

export default Dashboard;
