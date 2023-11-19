import "./AddListTitle.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmitTitle = async (event) => {
    event.preventDefault();

    const newListTitle = {
      title: event.target.text.value,
    };
    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      const response = await axios.post(
        `${baseURL}/api/list-titles`,
        newListTitle
      );
      const newItemId = response.data.id;

      setIsTitle(true);
      setTitle(newListTitle);

      // Update the URL by adding the ID as a query parameter
      navigate(`/lists/edit/${newItemId}`);
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isTitle) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <h2 className="add-list-title-form__header">ADD LIST</h2>
          {/* <div className="add-list-title-form__title-input"> */}
          {/* <label htmlFor="text">Title</label> */}
          <div className="add-list-title-form__wrapper">
            <input
              type="text"
              id="text"
              name="text"
              placeholder="add list title"
              className="add-list-title-form__input"
            />
            {/* </div> */}
            <button className="add-list-title-form__button"></button>
          </div>
        </form>
      </>
    );
  }

  if (isTitle) {
    return (
      <>
        <h2 className="add-list-title-form__header">ADD LIST</h2>
        <h3 className="add-list-title-form__list-title">{title.title}</h3>
      </>
    );
  }
}
