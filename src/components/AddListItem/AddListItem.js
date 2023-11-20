import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";

export default function AddListItem({ lists }) {
  const [allItems, setAllItems] = useState([]); //current ones??
  const [inputValue, setInputValue] = useState("");
  const { listId } = useParams();

  // console.log(allItems);

  // display all existing items for this list when clicking on "Edit" within list

  const parsedListId = parseInt(listId);

  const getItems = async () => {
    try {
      const data = await fetchListItems();
      // console.log(data); // array of objects
      const currentItemArr = data.filter((itemObj) => {
        return itemObj.list_id === parseInt(listId);
      });
      setAllItems(currentItemArr);
      // setIsTitle(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleSubmitItem = async (event) => {
    event.preventDefault();

    // const parsedListId = parseInt(listId);

    const newListItem = {
      text: event.target.listItem.value,
      list_id: parsedListId,
    };

    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      const response = await axios.post(
        `${baseURL}/api/list-items`,
        newListItem
      );
      const updatedItem = response.data;

      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
      // setIsTitle(true);
      // setTitle(newListTitle);
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item, index) => (
          <li key={index}>{item.text}</li>
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
    </div>
  );
}
