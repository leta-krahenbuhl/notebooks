import "./EditList.scss";
import AddEditListTitle from "../../components/AddEditListTitle/AddEditListTitle";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { Link, useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useLocation } from "react-router-dom";

export default function CreateList() {
  const { notebookId, listId } = useParams();
  const location = useLocation();

  return (
    <div className="create-list">
      <TopNavigation notebookId={notebookId} />
      <AddEditListTitle />
      <AddEditListItems />
      {location.pathname.endsWith("/edit") && (
        <Link to={`/notebooks/${notebookId}/lists/${listId}`}>
          <button className="edit-list-items__done-button">DONE</button>
        </Link>
      )}
    </div>
  );
}
