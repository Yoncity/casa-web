import Image from "next/image";
import style from "./index.module.scss";

const NoAccount = () => {
  return (
    <div className={style.no_account_container}>
      <Image
        src="/assets/icons/wallet.png"
        alt="Wallet icon"
        width={72}
        height={72}
      />
      <p>You have no open accounts</p>
    </div>
  );
};

export default NoAccount;
