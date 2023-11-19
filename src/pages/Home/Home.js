import "./Home.scss";
import NotebooksTitles from "../../components/NotebookTitles/NotebookTitles";
import plusIcon from "../../assets/images/plus.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="main-home">
        {" "}
        <NotebooksTitles />
      </main>
      <nav className="home-navigation">
        <Link to="/create/list">
          <img
            src={plusIcon}
            alt="add new notebook"
            className="home-navigation__image"
          />
        </Link>
      </nav>
    </>
  );
}
