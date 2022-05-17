import React, { useState } from "react";
import "./Navbar.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as NavHambergerSVG } from "../../assets/nav-hamberger.svg";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

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
      <Logo
        className="logo"
        onClick={() => window.location.replace(window.location.pathname)}
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
      <NavHambergerSVG
        className="hamberger"
        onClick={() => setIsOpen(!isOpen)}
      />
    </nav>
  );
};

export default Navbar;
