import { useState } from "react";
import { deleteItem } from "../../utils/AxiosRequests";
import "./Habit.scss";

export default function Habit({ habit, onItemUpdate, setRender, render }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(habit.text);
  const [isError, setIsError] = useState(false);

  const renderState = render;

  // Edit habit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      return setIsError(true);
    }

    onItemUpdate({ id: habit.id, text: value });
    setIsEditing(false);
    setIsError(false);
  };

  // Delete habit
  const handleDeleteItem = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${value}" ? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        const id = habit.id;
        await deleteItem(id);
      } catch (error) {
        console.error(error);
      }

      setRender(!renderState);
    } else {
      return <p>Couldn't delete habit.</p>;
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="wrapper">
          <form onSubmit={handleSubmit} className="habit-form">
            <input
              type="text"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            <button className="habit-form__button-save"></button>
          </form>
          {isError && (
            <p className="habit-form__error">
              Please enter text for your habit.
            </p>
          )}
        </div>
      ) : (
        <div className="edit-habit">
          <p className="edit-habit__text">{value}</p>
          <button
            className="edit-habit__button-delete"
            onClick={handleDeleteItem}
          ></button>
          <button
            className="edit-habit__button-edit"
            onClick={() => setIsEditing(true)}
          ></button>
        </div>
      )}
    </>
  );
}
