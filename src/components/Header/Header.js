import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import iconMenu from "../../assets/images/icon-menu.svg";
import { useState, useEffect } from "react";
import NotebookTitles from "../NotebookTitles/NotebookTitles";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Close menu on page change
  useEffect(() => {
    setIsMenuVisible(false); // Close menu whenever location changes
  }, [location.pathname]);

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
      <div className="header__breadcrumb">
        {location.pathname !== "/" && !isMenuVisible && <Breadcrumb />}
      </div>
      <div className="header__border"></div>
    </header>
  );
}
