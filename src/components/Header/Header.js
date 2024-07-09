import { Link } from "react-router-dom";
import "./Header.scss";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__logo">Notebooks</h1>
      </Link>
      {/* {<div className="header__border"></div>} */}
    </header>
  );
}
