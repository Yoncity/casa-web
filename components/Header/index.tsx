import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import style from "./index.module.scss";
import { InitialState } from "../../redux/initialState";
import locales from "../../constants/locale";

const Header: React.FC<{ inverted: boolean }> = ({ inverted }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [blend, setBlend] = useState(true);
  const [activeHeader, setActiveHeader] = useState(
    inverted ? "Dashboard" : "Home"
  );

  const { lang = "en" } = useSelector(
    ({ locale }): InitialState["locale"] => locale
  );

  const HEADER_OFFSET = 100;

  const listenScrollEvent = () => {
    if (inverted) setActiveHeader("Dashboard");
    else {
      const OFFSET = window.scrollY;

      if (OFFSET <= HEADER_OFFSET) {
        setBlend(true);
      } else if (OFFSET >= HEADER_OFFSET) {
        setBlend(false);
      }

      if (OFFSET >= 530) setActiveHeader("How it Works?");
      else setActiveHeader("Home");
    }
  };

  useEffect(() => {
    if (!inverted) {
      window.addEventListener("scroll", listenScrollEvent);
      return () => {
        window.removeEventListener("scroll", listenScrollEvent);
      };
    }
  }, [inverted]);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowMenu]);

  const linkToDiv = (link: string) => {
    const divElement: HTMLBodyElement | null = document.querySelector(link);
    setShowMenu(false);
    divElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  };

  const setActiveHeaderClass = (header: string) => {
    if (header === activeHeader) return style.active;
    return "";
  };

  return (
    <div
      className={`${style.header_container} ${
        !blend && style.white_background
      } ${(inverted || showMenu) && style.white_background}`}
      ref={ref}
    >
      <div className={`${style.header_container__left}`}>
        <div className={style.header_container__left__menu_icon}>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu icon"
            width={24}
            height={24}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>

        <Link href={inverted ? "/#home" : ""}>
          <a>
            <div
              className={style.header_container__left__app_name_container}
              onClick={() => linkToDiv("#home")}
            >
              <Image
                src="/assets/icons/casa.png"
                alt="Casa icon"
                width={56}
                height={56}
              />
              <p
                className={`${style.header_container__left__app_name_container__name} ${style.app_name}`}
              >
                CASA
              </p>
            </div>
          </a>
        </Link>
      </div>

      <div
        className={`${style.header_container__right} ${
          showMenu ? style.active_nav : ""
        }`}
      >
        {inverted ? (
          <>
            <Link href={inverted ? "/#home" : ""}>
              <a
                className={`${style.link} ${setActiveHeaderClass("Home")}`}
                onClick={() => linkToDiv("#home")}
              >
                {locales("home", lang)}
              </a>
            </Link>

            <Link href={inverted ? "/#how_it_works" : ""}>
              <a
                className={`${style.link} ${setActiveHeaderClass(
                  "How it Works?"
                )}`}
                onClick={() => linkToDiv("#how_it_works")}
              >
                {locales("how_it_works_title", lang)}
              </a>
            </Link>
          </>
        ) : (
          <>
            <p
              className={`${style.link} ${setActiveHeaderClass("Home")}`}
              onClick={() => linkToDiv("#home")}
            >
              {locales("home", lang)}
            </p>
            <p
              className={`${style.link} ${setActiveHeaderClass(
                "How it Works?"
              )}`}
              onClick={() => linkToDiv("#how_it_works")}
            >
              {locales("how_it_works_title", lang)}
            </p>
          </>
        )}

        <Link href="/dashboard">
          <a className={`${style.link} ${setActiveHeaderClass("Dashboard")}`}>
            {locales("dashboard", lang)}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;

// className={style.header_container__right__link}
