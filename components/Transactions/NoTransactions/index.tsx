import Image from "next/image";
import style from "./index.module.scss";

const NoTransaction = () => {
  return (
    <div className={style.no_transaction_container}>
      <Image
        src="/assets/icons/transaction.png"
        alt="Wallet icon"
        width={72}
        height={72}
      />
      <p>You have no transactions</p>
    </div>
  );
};

export default NoTransaction;
