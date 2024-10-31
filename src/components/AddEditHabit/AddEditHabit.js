import "./AddEditHabit.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHabits } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";
import Habit from "../Habit/Habit";

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
    <div className="add-edit-habit">
      <div className="add-edit-habit__list">
        {allHabits.map((habit) => (
          <div key={habit.id} className="add-edit-habit__item">
            <Habit
              habit={habit}
              onItemUpdate={handleUpateItem}
              setRender={setRender}
              render={render}
            />
          </div>
        ))}
      </div>
      {/* add new item */}
      <form className="add-habit-form" onSubmit={handleSubmitHabit}>
        <div className="add-habit-form__wrapper">
          <div className="add-habit-form__input-container">
            <label htmlFor="habit">Add a new habit</label>
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
            <div className="add-habit-form__label-input-container">
              <label htmlFor="frequency">Times / week?</label>
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
              <button
                className={`${
                  trackerId
                    ? "add-habit-form__button"
                    : "add-habit-form__button--inactive"
                }`}
              ></button>
            </div>
          </div>
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
