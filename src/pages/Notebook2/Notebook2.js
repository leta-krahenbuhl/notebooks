import "./Notebook2.scss";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import plusIconDesktop from "../../assets/images/icon-plus-grey.svg";
import { Link } from "react-router-dom";

export default function Notebook2() {
  const { notebookId } = useParams();

  return (
    <article className="notebook2">
      <div className="notebook2__nav-desktop-wrapper">
        <Header />
        <nav className="notebook2__nav">
          <NotebookTitles />
        </nav>
        <BottomNavigation />
      </div>
      <main className="notebook2__main">
        {/* <article className="notebook"> */}
        <List notebookId={notebookId} />
        {/* </article> */}
      </main>
    </article>
  );
}
