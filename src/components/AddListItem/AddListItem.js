import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";

export default function AddListItem({ lists }) {
  const [allItems, setAllItems] = useState([]); //current ones??
  const [inputValue, setInputValue] = useState("");
  const { listId } = useParams();

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

  const handleClick = () => {
    console.log("click");
  };

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item, index) => (
          <li key={index} className="add-list-items__item">
            {item.text}{" "}
            <button
              onClick={handleClick}
              className="add-list-items__button"
            ></button>
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
    </div>
  );
}
