import React from "react";
import "./Header.scss";
import { ReactComponent as HeroBgSVG } from "../../assets/hero-bg.svg";
import { ReactComponent as HeroScrollSVG } from "../../assets/hero-scroll.svg";
import { ReactComponent as HeroLaptopSVG } from "../../assets/hero-laptop.svg";
import { motion } from "framer-motion";
import { getDocumentDirection } from "../../utils/document";

const Header = ({ data }) => {
  const dir = getDocumentDirection();
  return (
    <motion.header
      initial={{ opacity: 0, left: dir === "ltr" ? "10%" : "-10%" }}
      animate={{ opacity: 1, left: "0%" }}
      transition={{ duration: 0.5 }}
    >
      <HeroBgSVG className="bg" preserveAspectRatio="none" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="laptop"
        alt="laptop"
      >
        <HeroLaptopSVG width="100%" height="100%" />
      </motion.div>

      <div className="heading">
        <motion.h1
          initial={{ opacity: 0, y: "30%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {data.headingText}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: "-10%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <HeroScrollSVG />
          <h3>{data.scrollCTA}</h3>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
