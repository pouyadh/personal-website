import React from "react";
import "./Header.scss";
import imgLaptop from "../../assets/hero-laptop.svg";
import { ReactComponent as HeroBgSVG } from "../../assets/hero-bg.svg";
import { ReactComponent as HeroScrollSVG } from "../../assets/hero-scroll.svg";

const Header = ({ data }) => {
  return (
    <header>
      <HeroBgSVG className="bg" preserveAspectRatio="none" />
      <img className="laptop" src={imgLaptop} alt="laptop" />

      <div className="heading">
        <h1>{data.headingText}</h1>
        <div>
          <HeroScrollSVG />
          <h3>{data.scrollCTA}</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
