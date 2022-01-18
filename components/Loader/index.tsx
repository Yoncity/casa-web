import style from "./index.module.scss";

const Loader = () => {
  return (
    <div className={style.main_loader_container}>
      <div className={style.loader_container}>
        <div className={style.loader_circle}></div>
      </div>
    </div>
  );
};

export default Loader;
