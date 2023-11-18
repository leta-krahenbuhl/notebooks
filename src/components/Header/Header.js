import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__logo">Notebooks</h1>
      </Link>
    </header>
  );
}
