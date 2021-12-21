import style from "./index.module.scss";
import Image from "next/image";

const Footer: React.FC<{}> = () => {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_container__header}>
        <div className={style.footer_container__header__left}>
          <Image
            src="/assets/icons/casa.png"
            alt="Casa icon"
            width={56}
            height={56}
          />
          <p className={style.footer_container__header__left__app_name}>CASA</p>
        </div>

        <div className={style.footer_container__header__right}>
          <Image
            src="/assets/icons/facebook.svg"
            alt="Facebook icon"
            width={32}
            height={32}
          />
          <div></div>
          <Image
            src="/assets/icons/twitter.svg"
            alt="Twitter icon"
            width={32}
            height={32}
          />
        </div>
      </div>
      <p className={style.footer_container__content}>
        Casa is an Eritrean word for a “money saving box” thats used by the
        locals. This is a decetralized version of the money saving box at your
        finger tips to prevent you cashing out your crypto abroptly.
      </p>
      <div className={style.footer_container__footer}>
        <div className={style.footer_container__footer__top}>
          <p className={style.footer_container__footer__top__language}>
            English
          </p>

          <p className={style.footer_container__footer__top__language}>
            Espanol
          </p>

          <p className={style.footer_container__footer__top__language}>
            French
          </p>
        </div>

        <div className={style.footer_container__footer__bottom}>
          <p className={style.footer_container__footer__bottom__left}>
            © 2021 Coin OP Laundry. All Rights Reserved.
          </p>
          <p className={style.footer_container__footer__bottom__right}>
            <span className={style.light}>Developed By</span> Yoncity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
