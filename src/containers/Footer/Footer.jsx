import { ReactComponent as Logo } from "../../assets/logo.svg";
import { FaLinkedinIn, FaEnvelope, FaGithubAlt } from "react-icons/fa";
import "./Footer.scss";
import { FormattedMessage } from "react-intl";

const icons = {
  linkedin: <FaLinkedinIn />,
  email: <FaEnvelope />,
  github: <FaGithubAlt />,
};

const Footer = ({ data }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleBackToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  return (
    <footer>
      <button onClick={handleBackToTop}>
        <FormattedMessage id="app.nav.back-to-top" />
      </button>
      <Logo
        className="logo"
        onClick={() => window.location.replace(window.location.pathname)}
      />
      <p className="motto">{data.motto}</p>

      <ul className="nav-links">
        {["projects", "skills", "about", "contact"].map((item) => (
          <li key={`navLink-${item}`}>
            <a href={`#${item}`} onClick={handleLinkClick}>
              <FormattedMessage id={`app.nav.${item}`} />
            </a>
          </li>
        ))}
      </ul>

      <ul className="social-media">
        {data.outLinks.map((item) => (
          <li key={`outlink-${item.iconName}`}>
            <a href={item.href} target={item.target}>
              {icons[item.iconName]}
            </a>
          </li>
        ))}
      </ul>

      <ul className="lang-links">
        <li>
          <a href="/?lang=fa">🇮🇷 فارسی</a>
        </li>
        |
        <li>
          <a href="/?lang=en">English 🇬🇧</a>
        </li>
      </ul>

      <ul className="subfooter">
        {data.subFooter.map((item, idx) => (
          <li key={`subFooter-${idx}`}>{item}</li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
