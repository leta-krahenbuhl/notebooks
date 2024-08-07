import "./AddList.scss";
import AddEditListTitle from "../../components/AddEditListTitle/AddEditListTitle";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

export default function AddList() {
  const { notebookId, listId } = useParams();
  const location = useLocation();

  return (
    <article className="add-list">
      <div className="add-list__nav-desktop-wrapper">
        <Header />
        <nav className="add-list__nav">
          <NotebookTitles />
        </nav>
        <div className="add-list__bottom-nav-desk">
          <BottomNavigation />
        </div>
      </div>

      <article className="add-list__main">
        <AddEditListTitle />
        <AddEditListItems />

        {/* Creating a new list and added title/items and coming from notebook page */}
        {location.pathname.endsWith(
          `create/lists/${listId}` || location.pathname.endsWith(`/edit`)
        ) && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-list__done-button">DONE</button>
          </Link>
        )}

        <Link to={`/notebooks/${notebookId}`}>
          <p className="add-list__cancel-button">CANCEL</p>
        </Link>
      </article>

      <div className="add-list__bottom-nav-mobile">
        <BottomNavigation />
      </div>
    </article>
  );
}
