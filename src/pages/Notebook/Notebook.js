import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import { useParams } from "react-router-dom";
// import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./Notebook.scss";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";

export default function Notebook() {
  const { notebookId } = useParams();

  return (
    <>
      <div className="desktop-wrapper">
        <div className="nav-desktop-wrapper">
          <Header />
          <nav className="nav">
            <NotebookTitles />
          </nav>
        </div>
        <article className="notebook">
          <List notebookId={notebookId} />
        </article>
      </div>

      <div className="bottom-navigation-mobile">
        <BottomNavigation />
      </div>
    </>
  );
}
