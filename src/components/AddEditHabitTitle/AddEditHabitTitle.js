import "./AddEditHabitTitle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { useEffect, useState } from "react";

export default function AddEditHabitTitle() {
  const [isTitle, setIsTitle] = useState(false);
  const [titleArr, setTitleArr] = useState("");
  const [title, setTitle] = useState(""); //used as a dependency for rendering titleArr
  const [isError, setIsError] = useState(false);
  const [dateWC, setDateWC] = useState("");

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

  const navigate = useNavigate();
  const { notebookId, listId } = useParams();
  const baseURL = process.env.REACT_APP_BASE_URL;

  //get all list titles?
  useEffect(() => {
    if (listId) {
      const getTitles = async () => {
        try {
          const data = await fetchListTitles();
          const currentTitleArr = data.filter((titleObj) => {
            return titleObj.id === parseInt(listId);
          });
          setTitleArr(currentTitleArr);
          setIsTitle(true);
        } catch (error) {
          console.error(error);
        }
      };

      getTitles();
    }
  }, [title, listId]);

  // save a title
  const handleSubmitTitle = async (event) => {
    event.preventDefault();
    setIsError(false);

    if (!event.target.text.value) {
      return setIsError(true);
    }

    //create a new list
    if (!listId) {
      const parsedNotebookId = parseInt(notebookId);

      const newListTitle = {
        title: event.target.text.value,
        notebook_id: parsedNotebookId,
      };

      try {
        const response = await axios.post(
          `${baseURL}/api/list-titles`,
          newListTitle
        );

        const newListTitleId = response.data.id;

        setIsError(false);
        setTitle(newListTitle);
        setIsTitle(true);

        navigate(`/notebooks/${notebookId}/create/lists/${newListTitleId}`);

        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    }

    //edit an existing list
    if (listId) {
      setIsError(false);

      if (!event.target.text.value) {
        return setIsError(true);
      }

      const newListTitle = {
        id: listId,
        title: event.target.text.value,
      };

      try {
        await axios.put(`${baseURL}/api/list-titles`, newListTitle);

        setIsError(false);
        setTitle(newListTitle);
        setIsTitle(true);

        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  //setting isTitle to false will display the input field
  const handleClick = () => {
    setIsTitle(false);
  };

  //add a new list
  if (!isTitle && !listId) {
    return (
      <article className="edit-habit-tracker-title">
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
            <button className="edit-habit-tracker-title__button"></button>
          </div>
          {isError && (
            <p className="edit-habit-tracker-title__error add-list-title__error--new">
              Please enter a habit tracker title.
            </p>
          )}
        </form>
      </article>
    );
  }

  //edit existing list title
  if (!isTitle && listId) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <h2 className="add-list-title-form__header">EDIT HABIT TRACKER</h2>
          <div className="add-list-title-form__wrapper">
            <input
              type="text"
              id="text"
              name="text"
              placeholder="add list title"
              className="add-list-title-form__input"
              defaultValue={
                titleArr && titleArr.length > 0 ? titleArr[0].title : ""
              }
            />
            <button className="add-list-title-form__button"></button>
          </div>
        </form>
        {isError && (
          <p className="add-list-title-form__error">
            Please enter a habit tracker title.
          </p>
        )}
      </>
    );
  }

  //title displayed (no input field)
  if (isTitle) {
    return (
      <article className="edit-title">
        <h2 className="edit-title__header">EDIT HABIT TRACKER TITLE</h2>
        <div className="edit-title__wrapper">
          <h3 className="edit-title__list-title">
            {titleArr && titleArr.length > 0 ? titleArr[0].title : ""}
          </h3>
          <button
            alt="edit list title button"
            onClick={() => handleClick(titleArr[0].title)}
            className="edit-title__button-edit"
          ></button>
        </div>
      </article>
    );
  }
}
