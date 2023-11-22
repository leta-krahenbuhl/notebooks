import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";
import { deleteItem } from "../../utils/AxiosRequests";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddListItem() {
  const [allItems, setAllItems] = useState([]); //only items for current list title
  const [editedItem, setEditedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { notebookId, listId } = useParams();
  const location = useLocation();

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getItems = async () => {
    try {
      const data = await fetchListItems();
      const currentItemArr = data.filter((itemObj) => {
        return itemObj.list_id === parseInt(listId);
      });
      setAllItems(currentItemArr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleSubmitItem = async (event) => {
    event.preventDefault();

    const newListItem = {
      text: event.target.listItem.value,
      list_id: parsedListId,
    };
    // put front-end form evaluation here

    try {
      const response = await axios.post(
        `${baseURL}/api/list-items`,
        newListItem
      );
      const updatedItem = response.data;

      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    setEditedItem(item.id);
  };

  const handleItemEdit = async (editedText, itemId) => {
    const updateItemObject = {
      id: itemId,
      text: editedText,
    };

    try {
      await editListItem(updateItemObject);
      setEditedItem(null);
    } catch (error) {
      return console.error(error);
    }

    getItems();
  };

  const handleDeleteItemClick = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteItem(itemId);
      } catch (error) {
        console.error(error);
      }
      getItems();
    } else {
      console.log("Item deletion cancelled");
    }
  };

  const handleDoneButtonClick = () => {};

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="add-list-items__item">
            {editedItem === item.id ? (
              <div>
                <input
                  type="text"
                  defaultValue={item.text}
                  onBlur={(e) => handleItemEdit(e.target.value, item.id)}
                />
              </div>
            ) : (
              <div onClick={() => handleItemClick(item)}>{item.text}</div>
            )}
            {location.pathname.endsWith("/edit") && (
              <button
                onClick={() => handleDeleteItemClick(item.id)}
                className="delete-list-item-button"
              ></button>
            )}
          </li>
        ))}
      </ul>
      <form className="add-list-items-form" onSubmit={handleSubmitItem}>
        <div className="add-list-items-form__wrapper">
          <input
            type="text"
            className="add-list-items-form__input"
            name="listItem"
            placeholder="add list item"
          />
          <button className="add-list-items-form__button"></button>
        </div>
      </form>
      {location.pathname.endsWith("/edit") && (
        <button
          onClick={handleDoneButtonClick}
          className="edit-list-items__done-button"
        >
          DONE
        </button>
      )}
    </div>
  );
}
