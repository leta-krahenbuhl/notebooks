import "./CreateHabitTracker.scss";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import AddEditHabit from "../../components/AddEditHabit/AddEditHabit";
import AddEditHabitTrackerTitle from "../../components/AddEditHabit/AddEditHabitTrackerTitle/AddEditHabitTrackerTitle";

export default function CreateHabitTracker() {
  const location = useLocation();

  const { notebookId, trackerId } = useParams(); //TODO trackerId right here?

  // add a new habit tracker (eg no trackerId yet, isEdit is true by default)
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
        <div className="edit-habit-tracker-title">
          <AddEditHabitTrackerTitle />
        </div>

        <AddEditHabit />

        {/* Creating a new tracker and added title/items and coming from notebook page */}
        {location.pathname.endsWith(
          `create/trackers/${trackerId}` || location.pathname.endsWith(`/edit`)
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
