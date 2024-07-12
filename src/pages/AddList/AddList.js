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
      <div className="add-list__nav-wrapper">
        <Header />
        <nav className="add-list__nav">
          <NotebookTitles />
        </nav>
        <BottomNavigation />
      </div>

      <main className="add-list__main">
        <AddEditListTitle />
        <AddEditListItems />

        {/* Adding a new list without saving a title => coming from notebook page */}
        {location.pathname.endsWith("create/lists") && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-list__done-button">DONE</button>
          </Link>
        )}

        {/* Creating a new list and added title/items and coming from notebook page */}
        {location.pathname.endsWith(`create/lists/${listId}`) && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-list__done-button">DONE</button>
          </Link>
        )}

        {/* Edit an existing list => coming from list page*/}
        {location.pathname.endsWith("/edit") && (
          <Link to={`/notebooks/${notebookId}/lists/${listId}`}>
            <button className="add-list__done-button">DONE</button>
          </Link>
        )}
      </main>
    </article>
  );
}
