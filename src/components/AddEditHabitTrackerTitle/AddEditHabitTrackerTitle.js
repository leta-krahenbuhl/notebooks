import "./AddEditHabitTrackerTitle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTrackerTitles } from "../../utils/AxiosRequests";

export default function AddEditHabitTrackerTitle() {
  const [dateWC, setDateWC] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState(""); //used as a dependency for rendering titleArr
  const [isTitle, setIsTitle] = useState(false);
  const [titleArr, setTitleArr] = useState(""); // all tracker titles

  const navigate = useNavigate();
  const { notebookId, trackerId } = useParams();
  const baseURL = process.env.REACT_APP_BASE_URL;

  // Helper function to parse "WC 30th Sept 2024" to "YYYY-MM-DD"
  const parseDateWC = (dateWC) => {
    const regex = /WC (\d{1,2})(st|nd|rd|th) (\w+) (\d{4})/;
    const match = dateWC.match(regex);
    if (!match) return ""; // Return empty if no match

    const day = parseInt(match[1]);
    const month = new Date(Date.parse(match[3] + " 1, 2020")).getMonth(); // Convert month name to index
    const year = parseInt(match[4]);

    const formattedDate = new Date(year, month, day)
      .toISOString()
      .split("T")[0];
    return formattedDate;
  };

  //get all tracker titles, set current title info in titleArr
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

          if (currentTitleArr.length > 0) {
            const existingDateWC = currentTitleArr[0].title; // adjust property as needed
            setDateWC(parseDateWC(existingDateWC));
          }
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

  // Add new tracker title
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

  // Edit tracker title
  // (title not displayed but trackerId so editing existing one)
  if (trackerId && !isTitle) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <h2 className="add-list-title-form__header">EDIT HABIT TRACKER</h2>
          <div className="add-list-title-form__wrapper">
            <input
              type="date"
              id="week-start"
              name="week-start"
              onChange={handleDateChange}
              className="add-list-title-form__input"
              value={dateWC}
            />
            <button className="add-list-title-form__button"></button>
          </div>
        </form>
        {isError && (
          <p className="add-list-title-form__error">
            Please enter a week for the tracker.
          </p>
        )}
      </>
    );
  }

  //title displayed (no input field)
  if (isTitle) {
    return (
      <article className="add-edit-tracker-title">
        <h2 className="add-edit-tracker-title__header">EDIT HABIT TRACKER</h2>
        <div className="add-edit-tracker-title__wrapper">
          <h3 className="add-edit-tracker-title__list-title">
            {titleArr && titleArr.length > 0 ? titleArr[0].title : ""}
          </h3>
          <button
            alt="edit list title button"
            onClick={() => handleClick(title)}
            className="add-edit-tracker-title__button-edit"
          ></button>
        </div>
      </article>
    );
  }
}
