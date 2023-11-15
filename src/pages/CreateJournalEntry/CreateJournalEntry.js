import "./CreateJournalEntry.scss";
// import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function CreateJournalEntry() {
  // console.log(value); // returns html of current value
  // after every character, image is realllly long

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEntry = {
      title: event.target.title.value,
      text: event.target.text.value,
    };

    // console.log(newEntry); //works

    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;
    // console.log(baseURL); //works

    try {
      await axios.post(`${baseURL}/api/journal-entries/create`, newEntry);
      // setIsError(false);
      event.target.reset();
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  // --------------------------------- TO DO NEXT
  // I need a list of journals to make the select option work

  //put form validation in
  return (
    <>
      <main className="create-journal-entry">
        <h1>ADD JOURNAL ENTRY</h1>
        <form onSubmit={handleSubmit} className="form">
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
          <label htmlFor="text" className="form__label">
            Text
          </label>
          <textarea
            placeholder="Enter your text here"
            name="text"
            id="text"
            className="form__textarea"
            // className={
            //   formErrors.warehouse_name
            //     ? "form__text-input--red"
            //     : "form__text-input"
            // }
          ></textarea>
          <label htmlFor="journal" className="form__label">
            Add to journal:
          </label>
          <select name="journal" id="journal" required className="from__select">
            <option value="">Please select</option>
            {/* {journals.map((journal) => (
              <option value={journal.id} key={journal.id}>
                {journal.title}
              </option>
            ))} */}
          </select>
          <button type="submit" className="create-journal-entry__button">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
