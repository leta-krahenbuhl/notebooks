import "./AddListItem.scss";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddListItem({ lists }) {
  const [allItems, setAllItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { listId } = useParams();

  const handleSubmitItem = async (event) => {
    event.preventDefault();

    const parsedListId = parseInt(listId);
    console.log(parsedListId); //works, and its defo a nr

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="add-list-item">
      <h3 className="add-list-item__header">start your list:</h3>
      <ul className="added-items">
        {allItems.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
      <form className="add-list-item-form" onSubmit={handleSubmitItem}>
        <input
          type="text"
          className="add-list-item-form__input"
          name="listItem"
        />
        <button className="save">SAVE</button>
      </form>
    </div>
  );
}
