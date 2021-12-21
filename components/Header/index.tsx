// import Link from "next/link";
import Image from "next/image";
import style from "./index.module.scss";

const Header: React.FC<{}> = () => {
  return (
    <div className={style.header_container}>
      <div className={style.header_container__left}>
        <Image
          src="/assets/icons/casa.png"
          alt="Casa icon"
          width={56}
          height={56}
        />
        <a href="#" className={`${style.header_container__left__app_name}`}>
          CASA
        </a>
      </div>

      <div className={style.header_container__right}>
        <a href="#" className={`${style.link} ${style.active}`}>
          Home
        </a>
        <a href="#" className={style.link}>
          How it Works?
        </a>
        <a href="#" className={style.link}>
          Dashboard
        </a>
      </div>
    </div>
  );
};

export default Header;

// className={style.header_container__right__link}
