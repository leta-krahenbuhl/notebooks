import "./AddListItem.scss";
import axios from "axios";
import EditItem from "../EditItem/EditItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";

export default function AddListItem() {
  const [allItems, setAllItems] = useState([]); //only items for current list title
  const { listId } = useParams();
  const [isErrorNewItem, setIsErrorNewItem] = useState(false);
  const [render, setRender] = useState(false);

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchListItems();
        const currentItemArr = data.filter((itemObj) => {
          return itemObj.list_id === parseInt(listId);
        });
        return currentItemArr;
      } catch (error) {
        return console.error("An error occurred while getting items:", error);
      }
    };

    getItems()
      .then((data) => {
        setAllItems(data);
      })
      .catch(console.error);
  }, [listId, render]);

  const handleUpateItem = async (updatedItem) => {
    await editListItem(updatedItem);
  };

  // add new list item
  const handleSubmitItem = async (event) => {
    event.preventDefault();

    setIsErrorNewItem(false);

    if (!event.target.listItem.value) {
      return setIsErrorNewItem(true);
    }

    if (!listId) {
      return alert("Please add a list title before adding list items.");
    }

    const newListItem = {
      text: event.target.listItem.value,
      list_id: parsedListId,
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/list-items`,
        newListItem
      );
      //without this I get a "each child has to have a uniuqe key error msg?
      const updatedItem = response.data;

      setIsErrorNewItem(false);
      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // exisiting items
    <div className="edit-list-items">
      <ul className="edit-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="edit-list-items__item">
            <EditItem
              item={item}
              onItemUpdate={handleUpateItem}
              setRender={setRender}
              render={render}
            />
          </li>
        ))}
      </ul>
      {/* add new item */}
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
            placeholder="add item"
          />
          <button
            className={`${
              listId
                ? "add-list-items-form__button"
                : "add-list-items-form__button--inactive"
            }`}
          ></button>
        </div>
        {isErrorNewItem && (
          <p className="add-notebook-form__error">
            Please enter text for your item.
          </p>
        )}
      </form>
    </div>
  );
}
