import { Link } from "react-router-dom";
import "./Header.scss";
import { useLocation } from "react-router-dom";
import iconMenu from "../../assets/images/icon-menu.svg";
import { useState } from "react";
import NotebookTitles from "../NotebookTitles/NotebookTitles";

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <header className="header">
      <div className="header__logo-menu-container">
        <Link to="/">
          <h1 className="header__logo">Notebooks</h1>
        </Link>
        <img
          src={iconMenu}
          alt="menu icon"
          className="header__icon-menu"
          onClick={handleMenuClick}
        />
      </div>
      {isMenuVisible && (
        <div className="header__menu">
          <NotebookTitles />
        </div>
      )}
      <div className="header__border"></div>
    </header>
  );
}
