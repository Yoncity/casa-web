import style from "./index.module.scss";
type Props = {
  title: string;
};
const StatCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={style.stat_card_container}>
      <div className={style.stat_card_container__data}>{children}</div>
      <div className={style.stat_card_container__divider}></div>
      <p className={style.stat_card_container__title}>{title}</p>
    </div>
  );
};

export default StatCard;
