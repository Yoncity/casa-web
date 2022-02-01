import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import parseDate from "../../helpers/parseDate";
import style from "./index.module.scss";
import web3 from "web3";
import Image from "next/image";
import Modal from "../Modal";
import AmountInput from "../Inputs/AmountInput";
import Web3Controller from "../../helpers/Web3Controller";
import { InitialState } from "../../redux/initialState";
import NoAccount from "./NoAccount";
import Loader from "../Loader";
import getAccounts from "../../redux/actions/account/getAccounts";

type Props = {
  web3Controller: Web3Controller | undefined;
};

const statusMessage = {
  unlocked: {
    title: "WITHDRAW",
    value: "Lock period has expired",
  },
  locked: {
    title: "LOCKED",
    value: "Lock period has expired",
  },
};

const Account: React.FC<Props> = ({ web3Controller }) => {
  const { address } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const {
    data: accounts,
    error: accountsError,
    loading: accountsLoading,
  } = useSelector(
    ({ getAccounts }): InitialState["getAccounts"] => getAccounts
  );

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);

  const status = (data: any) =>
    data.timestamp > parseInt(dayjs(new Date()).format("YYYYMMDD"));

  const statusTitle = (status: boolean) => {
    return status ? statusMessage.locked.title : statusMessage.unlocked.title;
  };

  const statusValue = (status: boolean) => {
    return status ? statusMessage.locked.value : statusMessage.unlocked.value;
  };

  const handleAmountChange = ({ target: { value } }: any) => {
    setAmount(value);

    if (isNaN(value)) {
      setAmountError(true);
      return;
    }

    setAmountError(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (accounts && accounts.length == 0 && address) {
      getAccounts(address)(dispatch);
    }
  }, [dispatch, address, accounts]);

  if (accountsLoading) {
    return <Loader />;
  }

  if (accountsError) {
    return <p className="error">{accountsError}</p>;
  }

  if (accounts && accounts.length === 0) {
    return <NoAccount />;
  }

  if (accounts && accounts.length > 0) {
    return accounts.map((data: any) => (
      <>
        <div key={data._id} className={style.account_container}>
          <p className={style.account_container__title}>
            Account
            <span className={style.account_container__title__account_number}>
              #{data.accountNumber}
            </span>
          </p>

          <div className={style.account_container__info}>
            <p className={style.account_container__info__title}>Amount</p>
            <p
              className={`${
                (style.account_container__info__value,
                style.account_container__info__amount)
              }`}
            >
              {web3.utils.fromWei(data.balance)} ETH
            </p>
          </div>

          <div className={style.account_container__info}>
            <p className={style.account_container__info__title}>Locked In</p>
            <p className={style.account_container__info__value}>
              {dayjs(data.createdAt).format("DD MMMM YYYY")}
            </p>
          </div>

          <div className={style.account_container__info}>
            <p className={style.account_container__info__title}>Unlocks In</p>
            <p className={style.account_container__info__value}>
              {parseDate(String(data.timestamp)).format("DD MMMM YYYY")}
            </p>
          </div>

          <div className={style.account_container__action_container}>
            <CustomButton
              title={statusTitle(status(data))}
              value={statusValue(status(data))}
              locked={status(data)}
              setShowModal={setShowModal}
              address={address}
              accountNumber={data.accountNumber}
              web3Controller={web3Controller}
              dispatch={dispatch}
            />
          </div>
        </div>
        <Modal
          header="Update Account"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className={style.update_account}>
            <AmountInput
              placeholder="Amount"
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
            <button
              className={`${style.button} ${style.button_primary}`}
              onClick={() => {
                if (web3Controller) {
                  web3Controller.updateAccount(
                    address,
                    data.accountNumber,
                    amount,
                    dispatch,
                    () => setShowModal(false)
                  );
                }
              }}
            >
              Finish
            </button>
          </div>
        </Modal>
      </>
    ));
  }
};

type CustomButtonProps = {
  title: string;
  value: string;
  locked: boolean;
  address: string;
  accountNumber: Number;
  setShowModal: any;
  web3Controller: Web3Controller | undefined;
  dispatch: any;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  value,
  locked,
  address,
  accountNumber,
  setShowModal,
  web3Controller,
  dispatch,
}) => {
  const handleWithdraw = (
    locked: boolean,
    address: string,
    accountNumber: Number
  ) => {
    if (!locked) {
      if (web3Controller) {
        web3Controller.closeAccount(address, accountNumber, dispatch);
      }
    }
  };

  return (
    <div
      className={`${style.account_container__action_container__action} ${
        locked ? style.custom_button_not_active : style.custom_button_active
      }`}
      onClick={() => handleWithdraw(locked, address, accountNumber)}
    >
      <p className={style.account_container__action_container__action__title}>
        {title}
      </p>
      <p className={style.account_container__action_container__action__value}>
        {value}
      </p>
      {locked && (
        <div
          className={style.account_container__action_container__action__update}
          onClick={() => setShowModal(true)}
        >
          <p
            className={
              style.account_container__action_container__action__update__title
            }
          >
            Update
          </p>
          <Image
            src="/assets/icons/edit.png"
            alt="Edit icon"
            width={18}
            height={18}
          />
        </div>
      )}
    </div>
  );
};

export default Account;
