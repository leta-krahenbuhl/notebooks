import "./CreateHabitTracker.scss";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { useState } from "react";
import AddEditHabit from "../../components/AddEditHabit/AddEditHabit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateHabitTracker() {
  const location = useLocation();
  const [dateWC, setDateWC] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState(""); //used as a dependency for rendering titleArr
  const [isTitle, setIsTitle] = useState(false);

  const navigate = useNavigate();
  const { notebookId, listId, trackerId } = useParams(); //TODO trackerId right here?
  const baseURL = process.env.REACT_APP_BASE_URL;

  // Adjust date to the nearest previous Monday if not already a Monday
  const adjustToMonday = (selectedDate) => {
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek !== 1) {
      // 1 is Monday
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate difference to Monday
      dateObj.setDate(dateObj.getDate() + diff);
    }

    return dateObj.toISOString().split("T")[0]; // Convert back to YYYY-MM-DD format
  };

  // set dateWC
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const adjustedDate = adjustToMonday(selectedDate);
    setDateWC(adjustedDate);
  };

  // save the habit tracker
  const handleSubmitTitle = async (event) => {
    event.preventDefault();
    setIsError(false);
    console.log("dateWC: ", dateWC); // 2024-10-21
    console.log("trackerId: ", trackerId); // undefined

    if (!dateWC) {
      return setIsError(true);
    }

    // Take dateWC (ie 2024-10-21) and turn it into WC 21st Oct 2024
    // to use as title for tracker
    const formatTitle = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      const daySuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      return `WC ${day}${daySuffix(day)} ${month} ${year}`;
    };

    // //create a new habit tracker
    if (!trackerId) {
      const parsedNotebookId = parseInt(notebookId);
      const trackerTitle = formatTitle(dateWC);
      //   console.log("trackerTitle: ", trackerTitle); // works
      const newTrackerTitle = {
        title: trackerTitle,
        notebook_id: parsedNotebookId,
      };
      try {
        const response = await axios.post(
          `${baseURL}/api/tracker-titles`,
          newTrackerTitle
        );
        const newTrackerTitleId = response.data.id;
        console.log("newTrackerTitleId:", newTrackerTitleId);
        setIsError(false);
        setTitle(newTrackerTitle);
        setIsTitle(true);
        navigate(
          `/notebooks/${notebookId}/create/habit-tracker/${newTrackerTitleId}`
        );
        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    }

    // //edit an existing list
    // if (listId) {
    //   setIsError(false);

    //   if (!event.target.text.value) {
    //     return setIsError(true);
    //   }

    //   const newListTitle = {
    //     id: listId,
    //     title: event.target.text.value,
    //   };

    //   try {
    //     await axios.put(`${baseURL}/api/list-titles`, newListTitle);

    //     setIsError(false);
    //     setTitle(newListTitle);
    //     setIsTitle(true);

    //     event.target.reset();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  console.log("isTitle: ", isTitle);

  // add a new habit tracker
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
          <h2 className="edit-habit-tracker-title__header">
            ADD HABIT TRACKER
          </h2>
          <form
            className="edit-habit-tracker-title__form"
            onSubmit={handleSubmitTitle}
          >
            <div className="edit-habit-tracker-title__wrapper">
              <label htmlFor="week-start">Select Week:</label>
              <input
                type="date"
                id="week-start"
                name="week-start"
                value={dateWC}
                onChange={handleDateChange}
              />
              <button type="submit" className="edit-title__button"></button>
            </div>
            {isError && (
              <p className="edit-habit-tracker-title__error add-list-title__error--new">
                Please enter the week for this habit tracker.
              </p>
            )}
          </form>
          {isTitle ? <p>hiiiiiiiiii</p> : ""}
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
