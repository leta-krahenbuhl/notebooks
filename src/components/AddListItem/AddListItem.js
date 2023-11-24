import "./AddListItem.scss";
import axios from "axios";
import EditItem from "../EditItem/EditItem";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";

export default function AddListItem() {
  const [allItems, setAllItems] = useState([]); //only items for current list title
  const { listId } = useParams();
  const [isErrorNewItem, setIsErrorNewItem] = useState(false);

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getItems = useCallback(async () => {
    try {
      const data = await fetchListItems();
      const currentItemArr = data.filter((itemObj) => {
        return itemObj.list_id === parseInt(listId);
      });
      return currentItemArr;
    } catch (error) {
      console.error("An error occurred while getting items:", error);
      // Throw the error so that it can be caught in the Promise chain
      throw error;
    }
  }, [listId]); // Add listId as a dependency if it's used inside getItems

  useEffect(() => {
    getItems()
      .then((data) => {
        setAllItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [getItems]);

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
      console.log(error);
    }
  };

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="add-list-items__item">
            <EditItem
              item={item}
              onItemUpdate={handleUpateItem}
              getItems={getItems}
            />
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

//----------before useCallback

// const getItems = async () => {
//   try {
//     const data = await fetchListItems();
//     const currentItemArr = data.filter((itemObj) => {
//       return itemObj.list_id === parseInt(listId);
//     });
//     return currentItemArr;
//   } catch (error) {
//     return console.error("An error occurred while getting items:", error);
//   }
// };

// useEffect(() => {
//   getItems()
//     .then((data) => {
//       setAllItems(data);
//     })
//     .catch(console.error);
// }, [getItems]);
