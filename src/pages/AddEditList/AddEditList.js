import "./AddEditList.scss";
import AddEditListTitle from "../../components/AddEditListTitle/AddEditListTitle";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { Link, useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useLocation } from "react-router-dom";

export default function AddEditList() {
  const { notebookId, listId } = useParams();
  const location = useLocation();

  return (
    <div className="add-edit-list">
      <TopNavigation notebookId={notebookId} />
      <AddEditListTitle />
      <AddEditListItems />

      {/* Adding a new list without saving a title => coming from notebook page */}
      {location.pathname.endsWith("create/lists") && (
        <Link to={`/notebooks/${notebookId}`}>
          <button className="add-edit-list__done-button">DONE</button>
        </Link>
      )}

      {/* Creating a new list and added title/items => coming from notebook page */}
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
  );
}
