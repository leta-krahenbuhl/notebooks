import "./AddEditHabitTrackerTitle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTrackerTitles } from "../../../utils/AxiosRequests";

export default function AddEditHabitTrackerTitle() {
  const [dateWC, setDateWC] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState(""); //used as a dependency for rendering titleArr
  const [isTitle, setIsTitle] = useState(false);
  const [titleArr, setTitleArr] = useState(""); // all tracker titles

  const navigate = useNavigate();
  const { notebookId, trackerId } = useParams();
  const baseURL = process.env.REACT_APP_BASE_URL;

  //get all tracker titles
  useEffect(() => {
    // console.log("trackerId: ", trackerId); // works
    if (trackerId) {
      setIsTitle(true);

      const getTitles = async () => {
        try {
          const data = await fetchTrackerTitles();
          const currentTitleArr = data.filter((titleObj) => {
            return titleObj.id === parseInt(trackerId);
          });
          setTitleArr(currentTitleArr);
        } catch (error) {
          console.error(error);
        }
      };

      getTitles();
    }
  }, [title, trackerId]);

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
    if (!trackerId & !isTitle) {
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
        // console.log("newTrackerTitleId:", newTrackerTitleId);
        setIsError(false);
        setTitle(trackerTitle);
        navigate(
          `/notebooks/${notebookId}/create/habit-tracker/${newTrackerTitleId}`
        );
        setIsTitle(true);
        return;
        // event.target.reset();
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          // Display the error message from the backend
          alert(error.response.data.message);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    }

    // //edit an existing tracker title
    if (trackerId) {
      setIsError(false);

      if (!dateWC) {
        return setIsError(true);
      }

      const trackerTitle = formatTitle(dateWC);

      const newTrackerTitle = {
        id: trackerId,
        title: trackerTitle,
      };

      try {
        await axios.put(`${baseURL}/api/tracker-titles`, newTrackerTitle);

        setIsError(false);
        setTitle(trackerTitle);
        setIsTitle(false);
        // event.target.reset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  //setting isTitle to false will display the input field
  const handleClick = () => {
    setIsTitle(false);
  };

  //add new tracker title
  // (ie no tracker Id and isTitle set to false by default)
  if (!trackerId && !isTitle) {
    return (
      <>
        <h2 className="edit-habit-tracker-title__header">ADD HABIT TRACKER</h2>
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
              Please enter a week for this habit tracker.
            </p>
          )}
        </form>
      </>
    );
  }
  //   console.log("isTitle: ", isTitle);

  //title not displayed but trackerId so editing existing one
  if (trackerId && !isTitle) {
    return (
      <article className="edit-title">
        <h2 className="edit-title__header">EDIT HABIT TRACKER</h2>
        <div className="edit-title__wrapper">
          <h3 className="edit-title__list-title">
            <p>Editing existing tracker title</p>
            {title}
            {/* {titleArr && titleArr.length > 0 ? titleArr[0].title : ""} */}
          </h3>
          <button
            alt="edit list title button"
            onClick={() => handleClick(title)}
            className="edit-title__button-edit"
          ></button>
        </div>
      </article>
    );
  }

  //title displayed (no input field)
  if (isTitle) {
    return (
      <article className="edit-title">
        <h2 className="edit-title__header">EDIT HABIT TRACKER</h2>
        <div className="edit-title__wrapper">
          <h3 className="edit-title__list-title">
            <p>this should be the title</p>

            {title}
            {/* {titleArr && titleArr.length > 0 ? titleArr[0].title : ""} */}
          </h3>
          <button
            alt="edit list title button"
            onClick={() => handleClick(title)}
            className="edit-title__button-edit"
          ></button>
        </div>
      </article>
    );
  }
}
