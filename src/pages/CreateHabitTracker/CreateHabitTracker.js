import "./CreateHabitTracker.scss";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import AddEditHabitTitle from "../../components/AddEditHabitTitle/AddEditHabitTitle";

export default function CreateHabitTracker() {
  const { notebookId, listId } = useParams(); //TODO listId???
  const location = useLocation();

  return (
    <article className="add-habit-tracker">
      <div className="add-habit-tracker__nav-desktop-wrapper">
        <Header />
        <nav className="add-habit-tracker__nav">
          <NotebookTitles />
        </nav>
        <div className="add-habit-tracker__bottom-nav-desk">
          <BottomNavigation />
        </div>
      </div>

      <article className="add-habit-tracker__main">
        <AddEditHabitTitle />
        <AddEditListItems />

        {/* Creating a new list and added title/items and coming from notebook page */}
        {location.pathname.endsWith(
          `create/lists/${listId}` || location.pathname.endsWith(`/edit`)
        ) && (
          <Link to={`/notebooks/${notebookId}`}>
            <button className="add-habit-tracker__done-button">DONE</button>
          </Link>
        )}

        <Link to={`/notebooks/${notebookId}`}>
          <p className="add-habit-tracker__cancel-button">CANCEL</p>
        </Link>
      </article>
    </article>
  );
}
