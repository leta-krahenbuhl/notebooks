import "./Notebook2.scss";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";

export default function Notebook2() {
  const { notebookId } = useParams();
  const location = useLocation();

  return (
    <article className="notebook2">
      <div className="notebook2__nav-desktop-wrapper">
        <Header />
        <nav className="notebook2__nav">
          <NotebookTitles />
        </nav>
        <div className="notebook2__bottom-nav-desk">
          <BottomNavigation />
        </div>
      </div>

      <article className="notebook2__main">
        <List notebookId={notebookId} />
        <div className="notebook2__whitespace"></div>
      </article>

      <div className="notebook2__bottom-nav-mobile">
        <BottomNavigation />
      </div>
    </article>
  );
}
