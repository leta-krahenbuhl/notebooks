import "./NotebookTitles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { editNotebookTitle } from "../../utils/AxiosRequests";
import { deleteNotebook } from "../../utils/AxiosRequests";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notebookToEdit, setNotebookToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

  //setEditedTitle before starting to edit to populate input field with current title
  useEffect(() => {
    if (notebookToEdit !== null) {
      setEditedTitle(
        notebooks.find((notebook) => notebook.id === notebookToEdit)?.title ||
          ""
      );
    }
  }, [notebookToEdit, notebooks]);

  const getNotebookTitles = async () => {
    try {
      const data = await fetchNotebookTitles();
      setNotebooks(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotebookTitles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notebook? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteNotebook(id);
      } catch (error) {
        console.error(error);
      }

      navigate(`/`);

      getNotebookTitles();
    } else {
      navigate(`/`);
    }
  };

  const handleClickEditIcon = async (id) => {
    setNotebookToEdit(id);
  };

  const handleSaveTitle = async (event, id) => {
    event.preventDefault();

    if (!editedTitle && !((notebook) => notebook.id === notebookToEdit).title) {
      return setIsError(true);
    }

    const submittedTitle =
      editedTitle ||
      notebooks.find((notebook) => notebook.id === notebookToEdit)?.title;

    setFormErrors({});
    const errors = {};
    let isFormValid = true;

    if (!submittedTitle) {
      isFormValid = false;
      errors["title"] = "Please enter a notebook title";
    }

    if (!isFormValid) {
      return setFormErrors(errors);
    }

    const parsedNotebookId = parseInt(id);

    try {
      await editNotebookTitle({ id: parsedNotebookId, title: submittedTitle });
      setNotebookToEdit(null);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }

    getNotebookTitles();
    navigate(`/`);
  };

  //page load and delete render
  if (location.pathname === "/" || location.pathname === "/delete") {
    return (
      <>
        {notebooks.map((notebook) => {
          return (
            <div className="notebook__wrapper" key={notebook.date}>
              <div className="notebook__delete-wrapper">
                <Link to={`/notebooks/${notebook.id}`}>
                  <h2 className="notebook__title">{notebook.title}</h2>
                </Link>
                {location.pathname === "/delete" && (
                  <button
                    onClick={() => handleDelete(notebook.id)}
                    className="notebook__button-delete"
                  ></button>
                )}
              </div>
              {location.pathname === "/edit" && (
                <button
                  onClick={() => handleClickEditIcon(notebook.id)}
                  className="notebook__button-edit"
                ></button>
              )}
            </div>
          );
        })}
      </>
    );
  }

  //after clicking on edit
  if (location.pathname === "/edit") {
    return (
      <>
        {notebooks.map((notebook) => {
          return (
            <div className="notebook__wrapper" key={notebook.date}>
              {notebookToEdit === notebook.id ? (
                //if notebook title id is the one that is being edited
                <div className="notebook__form-wrapper">
                  <form className="notebook-edit-form">
                    <input
                      type="text"
                      className="notebook-edit-form__input"
                      value={editedTitle}
                      onChange={(event) => setEditedTitle(event.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={(event) => handleSaveTitle(event, notebook.id)}
                      className="notebook__button-save"
                    ></button>
                  </form>
                  {isError && (
                    <p className="notebook__error">Please enter a title.</p>
                  )}
                </div>
              ) : (
                //if notebook title id is NOT the one that is being edited
                <div className="notebook__wrapper-single">
                  <Link to={`/notebooks/${notebook.id}`}>
                    <h2 className="notebook__title">{notebook.title}</h2>
                  </Link>

                  <button
                    onClick={() => handleClickEditIcon(notebook.id)}
                    className="notebook__button-edit"
                  ></button>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }
}
