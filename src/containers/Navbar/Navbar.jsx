import React, { useState } from "react";
import "./Navbar.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as NavHambergerSVG } from "../../assets/nav-hamberger.svg";
import classNames from "classnames";

const Navbar = ({ data }) => {
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
        {data.navLinks.map((item) => (
          <li key={`navLink-${item.caption}`}>
            <a href={item.href} onClick={handleLinkClick}>
              {item.caption}
            </a>
          </li>
        ))}
      </ul>
      <NavHambergerSVG
        className="hamberger"
        onClick={() => setIsOpen(!isOpen)}
      />
    </nav>
  );
};

export default Navbar;
