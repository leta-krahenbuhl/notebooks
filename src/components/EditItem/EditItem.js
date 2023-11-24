import { useState } from "react";
import { deleteItem } from "../../utils/AxiosRequests";
import "./EditItem.scss";

export default function EditItem({
  item,
  onItemUpdate,
  getItems,
  setRender,
  render,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.text);
  const [isError, setIsError] = useState(false);

  const renderState = render;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      return setIsError(true);
    }

    onItemUpdate({ id: item.id, text: value });
    setIsEditing(false);
    setIsError(false);
  };

  const handleDeleteItem = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${value}" ? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        const id = item.id;
        await deleteItem(id);
      } catch (error) {
        console.error(error);
      }
      console.log("here");
      // getItems();
      setRender(!renderState);
    } else {
      //change this before submission
      console.log("Item deletion cancelled");
    }
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <button className="save-edit-list-item-button"></button>
          {isError && (
            <p className="add-notebook-form__error">
              Please enter text for your item.
            </p>
          )}
        </form>
      ) : (
        <div className="edit-item">
          <p className="edit-item__text">{value}</p>
          <button
            className="edit-item__button-edit"
            onClick={() => setIsEditing(true)}
          ></button>
          <button
            className="edit-item__button-delete"
            onClick={handleDeleteItem}
          ></button>
        </div>
      )}
    </>
  );
}
