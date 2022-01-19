import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import Account from "../components/Account";
import Web3Controller from "../helpers/Web3Controller";
import style from "../styles/pages/dashboard.module.scss";
import { InitialState } from "../redux/initialState";
import AmountInput from "../components/AmountInput";
import Modal from "../components/Modal";
import CustomDatePicker from "../components/CustomDatePicker";
import dayjs from "dayjs";
import getAccounts from "../redux/actions/account/getAccounts";
import Loader from "../components/Loader";
import NoAccount from "../components/NoAccount";

const Dashboard: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const {
    data: accounts,
    error: accountsError,
    loading: accountsLoading,
  } = useSelector(
    ({ getAccounts }): InitialState["getAccounts"] => getAccounts
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

    if (address) {
      dispatch(getAccounts(address));
    }
  }, [dispatch, address]);

  if (web3Controller && address) {
    web3Controller.listenToEvents(address, dispatch);
  }

  // const router = useRouter();
  // if (!address) {
  //   router.push("/");
  // }

  const body = () => {
    if (accountsLoading) {
      return <Loader />;
    }

    if (accountsError) {
      return <p className="error">{accountsError}</p>;
    }

    if (accounts && accounts.length === 0) {
      return <NoAccount />;
    }

    if (accounts) {
      return accounts.map((account: any) => (
        <Account
          key={account._id}
          data={account}
          web3Controller={web3Controller}
        />
      ));
    }
  };

  return (
    <>
      <div className={style.dashboard_container}>
        <div className={style.dashboard_container__header}>
          <p className={style.dashboard_container__header__title}>
            Locked Accounts
          </p>
          <button
            className={`${style.button} ${style.button_primary}`}
            onClick={() => setShowModal(true)}
          >
            Lock Now
          </button>
        </div>

        <div className={style.dashboard_container__content}>{body()}</div>
      </div>
      <Modal
        header="New Account"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className={style.new_account}>
          <AmountInput
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            onClickMax={() => {}}
            error={amountError}
          />

          <div className={style.new_account__lock_date}>
            <p
              className={style.new_account__lock_date__title}
              onClick={() => setShowDatePicker(true)}
            >
              Unlock Period
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
                web3Controller.newLock(address, selectedDate, amount, dispatch);
              }
            }}
          >
            Finish
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
