import style from "./index.module.scss";

type Props = {
  mini?: boolean;
};
const Loader: React.FC<Props> = ({ mini }) => {
  return (
    <div
      className={
        mini ? style.main_loader_container_mini : style.main_loader_container
      }
    >
      <div className={style.loader_container}>
        <div className={style.loader_circle}></div>
        <div className={style.loader_circle_2}></div>
      </div>
    </div>
  );
};

export default Loader;
