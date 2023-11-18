import "./AddListTitle.scss";
import axios from "axios";
import { useState } from "react";

export default function List() {
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmitTitle = async (event) => {
    event.preventDefault();

    const newListTitle = {
      title: event.target.text.value,
    };
    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      await axios.post(`${baseURL}/api/list-titles`, newListTitle);
      // setIsError(false);
      event.target.reset();
      setIsTitle(true);
      setTitle(newListTitle);
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  if (!isTitle) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <div>
            <h2 className="add-list-title-form__header">ADD LIST</h2>
            <label htmlFor="text">Title</label>
            <input type="text" id="text" name="text" />
          </div>
          <button className="add-list-title-form__button">SAVE</button>
        </form>
      </>
    );
  }

  if (isTitle) {
    return (
      <>
        <h2 className="add-list-title-form__header">ADD LIST</h2>
        <p>{title.title}</p>
      </>
    );
  }
}
