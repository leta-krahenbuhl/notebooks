import "./CreateNotebook.scss";
// import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateNotebook() {
  const navigate = useNavigate();
  // console.log(value); // returns html of current value
  // after every character, image is realllly long

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNotebook = {
      title: event.target.title.value,
    };

    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      await axios.post(`${baseURL}/api/notebooks`, newNotebook);
      // setIsError(false);
      event.target.reset();
      alert("Notebook added successfully");
      navigate(`/`);
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  return (
    <>
      <main className="create-notebook-entry">
        <h1>ADD NOTEBOOK</h1>
        <form onSubmit={handleSubmit} className="add-notebook-form">
          <label htmlFor="title" className="form__label">
            Title
          </label>
          <input
            placeholder="Enter your title here"
            type="text"
            name="title"
            id="title"
            className="form__input"
            // className={
            //   formErrors.warehouse_name
            //     ? "form__text-input--red"
            //     : "form__text-input"
            // }
          />
          <button type="submit" className="add-notebook-form__button">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
