import React, { useState } from "react";
import "./Navbar.scss";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";

const v = {
  ltb: {
    close: {
      x1: "0%",
      x2: "100%",
    },
    open: {
      x1: "50%",
      x2: "50%",
    },
  },
  lc1: {
    close: {
      rotate: 0,
    },
    open: {
      rotate: 45,
    },
  },
  lc2: {
    close: {
      rotate: 0,
    },
    open: {
      rotate: -45,
    },
  },
};

const Hamberger = ({ closed, ...props }) => (
  <svg
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.line
      y1="1"
      x2="24"
      y2="1"
      stroke="white"
      strokeWidth="2"
      initial="close"
      animate={closed ? "close" : "open"}
      variants={v.ltb}
    />
    <motion.line
      y1="9"
      x2="24"
      y2="9"
      stroke="white"
      strokeWidth="2"
      initial="close"
      transform-origin="12px 9px"
      animate={closed ? "close" : "open"}
      variants={v.lc1}
    />
    <motion.line
      y1="9"
      x2="24"
      y2="9"
      stroke="white"
      strokeWidth="2"
      initial="close"
      animate={closed ? "close" : "open"}
      variants={v.lc2}
    />
    <motion.line
      y1="17"
      x2="24"
      y2="17"
      stroke="white"
      strokeWidth="2"
      initial="close"
      animate={closed ? "close" : "open"}
      variants={v.ltb}
    />
  </svg>
);

const Navbar = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false);
  };
  return (
    <nav className={classNames({ open: isOpen })}>
      <motion.div
        className="container"
        animate={{ height: isOpen ? "12em" : "4em" }}
      >
        <LogoSVG
          width={undefined}
          height={undefined}
          className="logo"
          onClick={() => window.location.replace(window.location.pathname)}
        />
        <Hamberger
          className="hamberger"
          onClick={() => setIsOpen(!isOpen)}
          closed={!isOpen}
        />
        <ul>
          {["projects", "skills", "about", "contact"].map((item) => (
            <li key={`navbar-navLink-${item}`}>
              <a href={`#${item}`} onClick={handleLinkClick}>
                <FormattedMessage id={`app.nav.${item}`} />
              </a>
            </li>
          ))}
          <li>
            {locale !== "fa" && <a href="?lang=fa">🇮🇷 فارسی</a>}
            {locale !== "en" && <a href="?lang=en">English 🇬🇧</a>}
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
