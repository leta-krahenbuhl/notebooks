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
    <div className="add-edit-list">
      <div className="add-edit-list__wrapper">
        <div className="add-edit-list__wrapper-side">
          <Header />
          <nav className="notebook2__nav">
            <NotebookTitles />
          </nav>
          <BottomNavigation />
        </div>
        <div className="add-edit-list__wrapper-main">
          <AddEditListTitle />
          <AddEditListItems />

          {/* Adding a new list without saving a title => coming from notebook page */}
          {location.pathname.endsWith("create/lists") && (
            <Link to={`/notebooks/${notebookId}`}>
              <button className="add-edit-list__done-button">DONE</button>
            </Link>
          )}

          {/* Creating a new list and added title/items and coming from notebook page */}
          {location.pathname.endsWith(`create/lists/${listId}`) && (
            <Link to={`/notebooks/${notebookId}`}>
              <button className="add-edit-list__done-button">DONE</button>
            </Link>
          )}

          {/* Edit an existing list => coming from list page*/}
          {location.pathname.endsWith("/edit") && (
            <Link to={`/notebooks/${notebookId}/lists/${listId}`}>
              <button className="add-edit-list__done-button">DONE</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
