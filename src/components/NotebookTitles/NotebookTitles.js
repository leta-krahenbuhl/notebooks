import "./NotebookTitles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { editNotebookTitle } from "../../utils/AxiosRequests";
import { deleteNotebook } from "../../utils/AxiosRequests";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";

export default function Home() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notebookToEdit, setNotebookToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [hoveredNotebookId, setHoveredNotebookId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  //setEditedTitle before starting to edit to populate input field with current title
  useEffect(() => {
    if (notebookToEdit !== null) {
      setEditedTitle(
        notebooks.find((notebook) => notebook.id === notebookToEdit)?.title ||
          ""
      );
    }
  }, [notebookToEdit, notebooks]);

  // Get all notebook titles in database
  const getNotebookTitles = async () => {
    try {
      const data = await fetchNotebookTitles();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

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

  // handle Delete notebook button
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
    navigate(`/edit`);
  };

  // save an edited ntoebook title
  const handleSaveTitle = async (event, id) => {
    event.preventDefault();

    if (!editedTitle && !((notebook) => notebook.id === notebookToEdit).title) {
      return setIsError(true);
    }

    const submittedTitle =
      editedTitle ||
      notebooks.find((notebook) => notebook.id === notebookToEdit)?.title;

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
            <div
              className="notebook__wrapper"
              key={notebook.date}
              onMouseEnter={() => setHoveredNotebookId(notebook.id)}
              onMouseLeave={() => setHoveredNotebookId(null)}
            >
              <Link to={`/notebooks/${notebook.id}`}>
                <h2 className="notebook__title">&#128211; {notebook.title}</h2>
              </Link>
              {hoveredNotebookId === notebook.id && (
                <div className="notebook__icon-wrapper">
                  <span className="notebook__icons">
                    <img
                      src={editIcon}
                      alt="edit notebook"
                      className="notebook__icon"
                      onClick={() => handleClickEditIcon(notebook.id)}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete notebook"
                      className="notebook__icon"
                      onClick={() => handleDelete(notebook.id)}
                    />
                  </span>
                </div>
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
