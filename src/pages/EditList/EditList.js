import "./EditList.scss";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import AddEditListTitle from "../../components/AddEditListTitle/AddEditListTitle";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export default function EditList() {
  const { notebookId, listId } = useParams();
  const location = useLocation();

  return (
    <article className="edit-list">
      <div className="edit-list__nav-desktop-wrapper">
        <Header />
        <nav className="edit-list__nav">
          <NotebookTitles />
        </nav>
        <div className="edit-list__bottom-nav-desk">
          <BottomNavigation />
        </div>
      </div>

      <article className="edit-list__main">
        <AddEditListTitle />
        <AddEditListItems />

        {/* Adding a new list without saving a title => coming from notebook page */}
        {/* {location.pathname.endsWith("create/lists") && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-edit-list__done-button">DONE</button>
          </Link>
        )} */}

        {/* Creating a new list and added title/items and coming from notebook page */}
        {/* {location.pathname.endsWith(`create/lists/${listId}`) && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-edit-list__done-button">DONE</button>
          </Link>
        )} */}

        {/* Edit an existing list */}
        {location.pathname.endsWith("/edit") && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="edit-list__done-button">DONE</button>
          </Link>
        )}
        <div className="edit-list__whitespace"></div>
      </article>

      <div className="edit-list__bottom-nav-mobile">
        <BottomNavigation />
      </div>
    </article>
  );
}
