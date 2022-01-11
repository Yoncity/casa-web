import { useEffect, useState, useRef } from "react";
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

const Dashboard: NextPage = () => {
  const [web3Controller, setWeb3Controller] = useState<Web3Controller>();

  const [showModal, setShowModal] = useState(true);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { address, error, loading } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
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

  if (web3Controller && address) {
    web3Controller.listenToEvents(address, dispatch);
  }

  // const router = useRouter();
  // if (!address) {
  //   router.push("/");
  // }

  return (
    <>
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

          <button className={`${style.button} ${style.button_primary}`}>
            Finish
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
