import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import style from "./index.module.scss";

const Header: React.FC<{}> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [blend, setBlend] = useState(true);
  const [activeHeader, setActiveHeader] = useState("Home");

  const HEADER_OFFSET = 100;

  const listenScrollEvent = () => {
    const OFFSET = window.scrollY;

    if (OFFSET <= HEADER_OFFSET) {
      setBlend(true);
    } else if (OFFSET >= HEADER_OFFSET) {
      setBlend(false);
    }

    if (OFFSET >= 530) setActiveHeader("How it Works?");
    else setActiveHeader("Home");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

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
      } ${showMenu && style.white_background}`}
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
        <div className={style.header_container__left__app_name_container}>
          <Image
            src="/assets/icons/casa.png"
            alt="Casa icon"
            width={56}
            height={56}
          />
          <a
            href="#"
            className={`${style.header_container__left__app_name_container__name} ${style.app_name}`}
          >
            CASA
          </a>
        </div>
      </div>

      <div
        className={`${style.header_container__right} ${
          showMenu ? style.active_nav : ""
        }`}
      >
        <p
          className={`${style.link} ${setActiveHeaderClass("Home")}`}
          onClick={() => linkToDiv("#home")}
        >
          Home
        </p>
        <p
          className={`${style.link} ${setActiveHeaderClass("How it Works?")}`}
          onClick={() => linkToDiv("#how_it_works")}
        >
          How it Works?
        </p>
        <Link href="/dashboard">
          <a className={style.link}>Dashboard</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;

// className={style.header_container__right__link}
