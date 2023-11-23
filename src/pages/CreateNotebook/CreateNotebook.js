import "./CreateNotebook.scss";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateNotebook() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNotebook = {
      title: event.target.title.value,
    };

    setFormErrors({});
    const errors = {};
    let isFormValid = true;

    if (!event.target.title.value) {
      isFormValid = false;
      errors["title"] = "Please enter a notebook title";
    }

    if (!isFormValid) {
      return setFormErrors(errors);
    }

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      await axios.post(`${baseURL}/api/notebooks`, newNotebook);
      setIsError(false);
      event.target.reset();
      alert("Notebook added successfully");
      navigate(`/`);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <>
      <main className="create-notebook-entry">
        <div className="create-notebook-entry__wrapper">
          <h1 className="create-notebook-entry__header">ADD NOTEBOOK</h1>
          <form onSubmit={handleSubmit} className="add-notebook-form">
            <div className="add-notebook-form__wrapper">
              <input
                placeholder="Enter your title here"
                type="text"
                name="title"
                id="title"
                className="add-notebook-form__input"
              />
              <button
                type="submit"
                className="add-notebook-form__button"
              ></button>
            </div>
            {formErrors.title && (
              <p className="add-notebook-form__error">{formErrors.title}</p>
            )}
          </form>
        </div>
        <button className="create-notebook-entry__cancel-button" onClick={`/`}>
          CANCEL
        </button>
      </main>
    </>
  );
}
