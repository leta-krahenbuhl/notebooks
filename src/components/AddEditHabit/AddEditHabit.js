import "./AddEditHabit.scss";
import axios from "axios";
import EditItem from "../EditItem/EditItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHabits } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";

export default function AddEditHabit() {
  const [allHabits, setAllHabits] = useState([]); //only items for current list title
  const [isErrorNewHabit, setIsErrorNewHabit] = useState(false);
  const [render, setRender] = useState(false);
  const [frequency, setFrequency] = useState(1);

  const { trackerId } = useParams();
  const parsedTrackerId = parseInt(trackerId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  // get habits with trackerId
  useEffect(() => {
    const getHabits = async () => {
      try {
        const data = await fetchHabits();
        const currentItemArr = data.filter((itemObj) => {
          return itemObj.tracker_id === parseInt(trackerId);
        });
        return currentItemArr;
      } catch (error) {
        return console.error("An error occurred while getting items:", error);
      }
    };

    getHabits()
      .then((data) => {
        setAllHabits(data);
      })
      .catch(console.error);
  }, [trackerId, render]);

  console.log("allHabits: ", allHabits);

  // edit list item
  const handleUpateItem = async (updatedItem) => {
    await editListItem(updatedItem);
  };

  // add new habit
  const handleSubmitHabit = async (event) => {
    event.preventDefault();

    setIsErrorNewHabit(false);

    if (!event.target.habit.value) {
      return setIsErrorNewHabit(true);
    }

    if (!trackerId) {
      return alert(
        "Please add a week for this habit and click save, before adding a habit."
      );
    }

    const newHabit = {
      text: event.target.habit.value,
      tracker_id: parsedTrackerId,
      circles: frequency,
    };

    // console.log("newHabit: ", newHabit);

    try {
      const response = await axios.post(`${baseURL}/api/habits`, newHabit);
      const updatedHabit = response.data;

      setIsErrorNewHabit(false);
      setAllHabits((prevHabits) => [...prevHabits, updatedHabit]);

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // exisiting items
    <div className="edit-list-items">
      <ul className="edit-list-items__list">
        <p>Existing habits here</p>
        {/* {allItems.map((item) => (
          <li key={item.id} className="edit-list-items__item">
            <EditItem
              item={item}
              onItemUpdate={handleUpateItem}
              setRender={setRender}
              render={render}
            />
          </li>
        ))} */}
      </ul>
      {/* add new item */}
      <form className="add-habit-form" onSubmit={handleSubmitHabit}>
        <div className="add-habit-form__wrapper">
          <div className="add-habit-form__input-container">
            <label htmlFor="habit">New habit</label>
            <input
              id="habit"
              type="text"
              className={`${
                trackerId
                  ? "add-habit-form__input"
                  : "add-habit-form__input--inactive"
              }`}
              name="habit"
              placeholder="add habit"
            />

            <label htmlFor="frequency">How many times / week?</label>
            <select
              id="frequency"
              name="frequency"
              className="add-habit-form__dropdown"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              {[...Array(7)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className={`${
              trackerId
                ? "add-habit-form__button"
                : "add-habit-form__button--inactive"
            }`}
          ></button>
        </div>
        {isErrorNewHabit && (
          <p className="add-notebook-form__error">
            Please enter text for your habit.
          </p>
        )}
      </form>
    </div>
  );
}
