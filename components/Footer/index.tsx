import style from "./index.module.scss";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import setLang from "../../redux/actions/lang";
import { InitialState } from "../../redux/initialState";
import locales from "../../constants/locale";

const Footer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const setLocale = (lang: string) => {
    dispatch(setLang(lang));
  };

  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

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
          <a href="https://www.linkedin.com/in/yonatan-dawit-833233162/">
            <Image
              src="/assets/icons/linkedIn.svg"
              alt="LinkedIn icon"
              width={32}
              height={32}
            />
          </a>
          <div></div>
          <a href="https://twitter.com/yonatan_dawit_c">
            <Image
              src="/assets/icons/twitter.svg"
              alt="Twitter icon"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
      <p className={style.footer_container__content}>
        {locales("footer_casa_info", lang)}
      </p>
      <div className={style.footer_container__footer}>
        <div className={style.footer_container__footer__top}>
          <p
            className={style.footer_container__footer__top__language}
            onClick={() => setLocale("en")}
          >
            English
          </p>

          <p
            className={style.footer_container__footer__top__language}
            onClick={() => setLocale("es")}
          >
            Espanol
          </p>

          <p
            className={style.footer_container__footer__top__language}
            onClick={() => setLocale("fr")}
          >
            French
          </p>
        </div>

        <div className={style.footer_container__footer__bottom}>
          <p className={style.footer_container__footer__bottom__left}>
            © {new Date().getFullYear()} Yoncity.{" "}
            {locales("all_rights_reserved", lang)}
          </p>
          <p className={style.footer_container__footer__bottom__right}>
            <span className={style.light}>{locales("developed_by", lang)}</span>{" "}
            Yoncity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
