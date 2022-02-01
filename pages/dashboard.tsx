import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import Web3Controller from "../helpers/Web3Controller";
import style from "../styles/pages/dashboard.module.scss";
import AmountInput from "../components/Inputs/AmountInput";
import Modal from "../components/Modal";
import Account from "../components/Account";
import CustomDatePicker from "../components/Inputs/CustomDatePicker";
import Loader from "../components/Loader";
import NoAccount from "../components/Account/NoAccount";
import { InitialState } from "../redux/initialState";
import authenticate from "../redux/actions/auth";
import getAccounts from "../redux/actions/account/getAccounts";
import getRate from "../redux/actions/rate";
import Layout from "../components/Layout";
import ProfileHome from "../components/ProfileHome";
import Transactions from "../components/Transactions";
import locales from "../constants/locale";

const Dashboard: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeHeader, setActiveHeader] = useState("Home");

  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const { error: createAccountError, loading: createAccountLoading } =
    useSelector(
      ({ createAccount }): InitialState["createAccount"] => createAccount
    );

  const { data: rate, loading: rateLoading } = useSelector(
    ({ rate }): InitialState["rate"] => rate
  );

  const dispatch = useDispatch();

  const handleAmountChange = ({ target: { value } }: any) => {
    setAmount(value);

    if (isNaN(value)) {
      setAmountError(true);
      return;
    }

    setAmountError(false);
  };

  useEffect(() => {
    let _web3Controller: Web3Controller | null = new Web3Controller();
    if (_web3Controller.supportedBrowser) {
      setWeb3Controller(_web3Controller);
      _web3Controller = null;
    }
  }, []);

  useEffect(() => {
    if (!rate && !rateLoading) {
      getRate()(dispatch);
    }
  }, [dispatch, rate, rateLoading]);

  const body = () => {
    if (activeHeader === "Home") {
      return <ProfileHome web3Controller={web3Controller} />;
    }

    if (activeHeader === "Accounts") {
      return <Account web3Controller={web3Controller} />;
    }

    if (activeHeader === "Transactions") {
      return <Transactions web3Controller={web3Controller} />;
    }
  };

  const notLoggedIn = () => {
    return (
      <div className={style.not_logged_in_container}>
        <button
          className={`${style.button} ${style.button_primary} ${style.not_logged_in_container__button}`}
          onClick={() => {
            if (web3Controller) {
              authenticate(web3Controller)(dispatch);
            }
          }}
        >
          {loading && <Loader mini={true} />}
          {locales("dashboard_please_connect_wallet", lang)}
        </button>
      </div>
    );
  };

  const setActiveHeaderClass = (header: string) => {
    if (header === activeHeader) return style.active;
    return "";
  };

  return (
    <Layout inverted>
      {!address ? (
        notLoggedIn()
      ) : (
        <div className={style.dashboard_container}>
          <div className={style.dashboard_container__header}>
            <div className={style.dashboard_container__header__left}>
              <p
                className={`${
                  style.dashboard_container__header__left__links
                } ${setActiveHeaderClass("Home")}`}
                onClick={() => setActiveHeader("Home")}
              >
                {locales("home", lang)}
              </p>
              <p
                className={`${
                  style.dashboard_container__header__left__links
                } ${setActiveHeaderClass("Accounts")}`}
                onClick={() => setActiveHeader("Accounts")}
              >
                {locales("accounts", lang)}
              </p>
              <p
                className={`${
                  style.dashboard_container__header__left__links
                } ${setActiveHeaderClass("Transactions")}`}
                onClick={() => setActiveHeader("Transactions")}
              >
                {locales("transactions", lang)}
              </p>
            </div>
            <button
              className={`${style.button} ${style.button_primary}`}
              onClick={() => setShowModal(true)}
            >
              {locales("dashboard_lock_add_account", lang)}
            </button>
          </div>

          <div className={style.dashboard_container__content}>{body()}</div>
        </div>
      )}
      <Modal
        header={locales("dashboard_new_account", lang)}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className={style.new_account}>
          <AmountInput
            placeholder={locales("amount", lang)}
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            onClickMax={() => {
              web3Controller
                ?.getBalance(address)
                .then((balance: string) => setAmount(balance));
            }}
            error={amountError}
          />

          <div className={style.new_account__lock_date}>
            <p
              className={style.new_account__lock_date__title}
              onClick={() => setShowDatePicker(true)}
            >
              {locales("dashboard_unlock_period", lang)}
            </p>
            <div
              className={style.new_account__lock_date__date_container}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <p className={style.new_account__lock_date__date_container__date}>
                {selectedDate.getDate()}
              </p>
              <p className={style.new_account__lock_date__date_container__date}>
                {dayjs(selectedDate).format("MMM")}
              </p>
              <p className={style.new_account__lock_date__date_container__date}>
                {selectedDate.getFullYear()}
              </p>
            </div>

            {showDatePicker && (
              <CustomDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setShowDatePicker={setShowDatePicker}
              />
            )}
          </div>

          <button
            className={`${style.button} ${style.button_primary}`}
            onClick={() => {
              if (web3Controller && address) {
                web3Controller.newLock(
                  address,
                  selectedDate,
                  amount,
                  dispatch,
                  () => setShowModal(false)
                );
              }
            }}
            disabled={createAccountLoading}
          >
            {createAccountLoading && (
              <>
                <Loader mini={true} />{" "}
                {locales("dashboard_creating_account", lang)}
              </>
            )}
            {!createAccountLoading && locales("dashboard_finish_button", lang)}
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
