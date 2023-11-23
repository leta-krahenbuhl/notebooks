import "./EditList.scss";
import AddListTitle from "../../components/AddListTitle/AddListTitle";
import AddListItem from "../../components/AddListItem/AddListItem";
import { Link, useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useLocation } from "react-router-dom";

export default function CreateList() {
  const { notebookId, listId } = useParams();
  const location = useLocation();

  return (
    <div className="create-list">
      <TopNavigation notebookId={notebookId} />
      <AddListTitle />
      <AddListItem />
      {location.pathname.endsWith("/edit") && (
        <Link to={`/notebooks/${notebookId}/lists/${listId}`}>
          <button className="edit-list-items__done-button">DONE</button>
        </Link>
      )}
    </div>
  );
}
