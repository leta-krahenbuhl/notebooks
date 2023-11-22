import "./CreateNotebook.scss";
// import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateNotebook() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNotebook = {
      title: event.target.title.value,
    };

    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      await axios.post(`${baseURL}/api/notebooks`, newNotebook);
      event.target.reset();
      alert("Notebook added successfully");
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="create-notebook-entry">
        <h1 className="create-notebook-entry__header">ADD NOTEBOOK</h1>
        <form onSubmit={handleSubmit} className="add-notebook-form">
          <input
            placeholder="Enter your title here"
            type="text"
            name="title"
            id="title"
            className="add-notebook-form__input"
          />
          <button type="submit" className="add-notebook-form__button"></button>
        </form>
      </main>
    </>
  );
}
