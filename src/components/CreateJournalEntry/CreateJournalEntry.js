import "./CreateJournalEntry.scss";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function CreateJournalEntry() {
  const [value, setValue] = useState("");
  const quillRef = useRef();

  // console.log(value); // returns html of current value
  // after every character, image is realllly long

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      console.log(delta); // works

      const newEntry = {
        content: delta,
      };

      // put front-end form evaluation here
      const baseURL = process.env.REACT_APP_BASE_URL;
      //   console.log(baseURL); works

      try {
        await axios.post(`${baseURL}/create/journal-entries`, newEntry);
        console.log("posted");
        // setIsError(false);
      } catch (error) {
        console.log(error);
        // setIsError(true);
      }
    }
    setValue("");
  };

  return (
    <>
      <main className="create-journal-entry">
        Add a journal entry
        <form onSubmit={handleSubmit} className="journal-entry-form">
          <div className="create-journal-entry__rich-text-editor">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  ["image", "code-block"],
                ],
              }}
              ref={quillRef}
            />
          </div>
          <button type="submit" className="create-journal-entry__button">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
