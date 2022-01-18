import dayjs from "dayjs";
import parseDate from "../../helpers/parseDate";
import style from "./index.module.scss";

type Props = {
  data: any;
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

const Account: React.FC<Props> = ({ data }) => {
  const status =
    data.timestamp > parseInt(dayjs(new Date()).format("YYYYMMDD"));

  const statusTitle = status
    ? statusMessage.locked.title
    : statusMessage.unlocked.title;

  const statusValue = status
    ? statusMessage.locked.value
    : statusMessage.unlocked.value;

  return (
    <div className={style.account_container}>
      <p className={style.account_container__title}>Account #1</p>

      <div className={style.account_container__info}>
        <p className={style.account_container__info__title}>Amount</p>
        <p
          className={`${
            (style.account_container__info__value,
            style.account_container__info__amount)
          }`}
        >
          0.004 ETH
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
        <CustomButton title={statusTitle} value={statusValue} locked={status} />
      </div>
    </div>
  );
};

type CustomButtonProps = {
  title: string;
  value: string;
  locked: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  value,
  locked,
}) => {
  return (
    <div
      className={`${style.account_container__action_container__action} ${
        locked ? style.custom_button_not_active : style.custom_button_active
      }`}
    >
      <p className={style.account_container__action_container__action__title}>
        {title}
      </p>
      <p className={style.account_container__action_container__action__value}>
        {value}
      </p>
    </div>
  );
};

export default Account;
