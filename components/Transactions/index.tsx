import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.module.scss";
import getTransactions from "../../redux/actions/transactions";
import NoTransaction from "./NoTransactions";
import Loader from "../Loader";
import Web3Controller from "../../helpers/Web3Controller";
import { InitialState } from "../../redux/initialState";
import locales from "../../constants/locale";

type Props = {
  web3Controller: Web3Controller | undefined;
};

const Transactions: React.FC<Props> = ({ web3Controller }) => {
  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

  const { address } = useSelector(
    ({ authenticate }): InitialState["authenticate"] => authenticate
  );

  const { data, error, loading } = useSelector(
    ({ transactions }): InitialState["transactions"] => transactions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.length == 0 && address) {
      getTransactions(address)(dispatch);
    }
  }, [dispatch, address, data]);

  const formatText = (text: string) => {
    return text.split("_").join(" ");
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (data && data.length === 0) {
    return <NoTransaction />;
  }

  return (
    <div className={style.transactions_container}>
      {data.map((transaction: any) => (
        <div
          key={transaction.accountID._id}
          className={style.transactions_container__transaction}
        >
          <p>
            {locales("account", lang)}: #{transaction.accountID.accountNumber}
          </p>
          <p>
            {locales("type", lang)}: {formatText(transaction.type)}
          </p>
          <p>
            {locales("amount", lang)}:{" "}
            {web3Controller?.convertFromWeiToEth(transaction.amount)} ETH
          </p>
          <p>
            {locales("status", lang)}: {transaction.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
