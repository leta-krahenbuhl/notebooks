import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";
import { deleteItem } from "../../utils/AxiosRequests";
import { useLocation } from "react-router-dom";

export default function AddListItem() {
  const [allItems, setAllItems] = useState([]); //only items for current list title
  const [editedItemId, setEditedItemId] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState("");
  const { notebookId, listId } = useParams();
  const location = useLocation();

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  //get items for current list title
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

  if (!listId) {
  }

  const handleSubmitItem = async (event) => {
    event.preventDefault();

    if (!listId) {
      return alert("Please add a list title before adding list items.");
    }

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
      //without this I get a "each child has to have a uniuqe key"
      //error message
      const updatedItem = response.data;

      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (itemId) => {
    setEditedItemId(itemId);
    console.log(editedItemId);
  };

  const handleSaveEditedItemClick = async (itemId) => {
    const updateItemObject = {
      id: itemId,
      text: editedItemValue,
    };

    try {
      await editListItem(updateItemObject);
      setEditedItemId(null);
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

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="add-list-items__item">
            {editedItemId === item.id ? (
              <form>
                <input
                  type="text"
                  defaultValue={item.text}
                  onChange={(event) => setEditedItemValue(event.target.value)}
                />
                <button
                  className="save-edit-list-item-button"
                  onClick={() => handleSaveEditedItemClick(item.id)}
                ></button>
              </form>
            ) : (
              <div>
                {item.text}
                <button
                  className="edit-list-items-button"
                  onClick={() => handleItemClick(item.id)}
                ></button>
              </div>
            )}
            {location.pathname.endsWith("/edit") && (
              <div className="delete-edit-wrapper">
                <button
                  onClick={() => handleDeleteItemClick(item.id)}
                  className="delete-list-item-button"
                ></button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <form className="add-list-items-form" onSubmit={handleSubmitItem}>
        <div className="add-list-items-form__wrapper">
          <input
            type="text"
            className={`${
              listId
                ? "add-list-items-form__input"
                : "add-list-items-form__input--inactive"
            }`}
            name="listItem"
            placeholder="add list item"
          />
          <button
            className={`${
              listId
                ? "add-list-items-form__button"
                : "add-list-items-form__button--inactive"
            }`}
          ></button>
        </div>
      </form>
    </div>
  );
}
