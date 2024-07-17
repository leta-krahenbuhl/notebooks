import "./Breadcrumb.scss";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchNotebookTitles,
  editNotebookTitle,
  deleteNotebook,
} from "../../utils/AxiosRequests";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";

export default function Breadcrumb() {
  const [currentNotebook, setCurrentNotebook] = useState(null);
  const [notebookToEdit, setNotebookToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { notebookId } = useParams();

  // Fetch notebook titles and find the one that matches notebookId
  const getNotebookTitles = async () => {
    try {
      const data = await fetchNotebookTitles();
      const foundNotebook = data.find(
        (notebook) => notebook.id === parseInt(notebookId)
      );
      setCurrentNotebook(foundNotebook);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch notebook titles on component mount or when notebookId changes
  useEffect(() => {
    getNotebookTitles();
  }, [notebookId]);

  // Set edited title when notebookToEdit changes
  useEffect(() => {
    if (notebookToEdit !== null) {
      setEditedTitle(currentNotebook?.title || "");
    }
  }, [notebookToEdit, currentNotebook]);

  const handleClickEditIcon = () => {
    setNotebookToEdit(currentNotebook.id);
  };

  const handleSaveTitle = async (event) => {
    event.preventDefault();

    if (!editedTitle) {
      setIsError(true);
      return;
    }

    const parsedNotebookId = parseInt(notebookId);

    try {
      await editNotebookTitle({ id: parsedNotebookId, title: editedTitle });
      setNotebookToEdit(null);
      setIsError(false);
      getNotebookTitles(); // Refresh notebook titles after edit
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notebook? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteNotebook(currentNotebook.id);
        navigate(`/`);
        getNotebookTitles(); // Refresh notebook titles after delete
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <article className="breadcrumb">
      {notebookToEdit === currentNotebook?.id ? (
        <div className="breadcrumb__form-wrapper">
          <form className="breadcrumb-edit-form">
            <input
              type="text"
              className="breadcrumb-edit-form__input"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
            />
            <button
              type="submit"
              onClick={handleSaveTitle}
              className="breadcrumb__button-save"
            ></button>
          </form>
          {isError && (
            <p className="breadcrumb__error">Please enter a title.</p>
          )}
        </div>
      ) : (
        <div className="breadcrumb__wrapper">
          <div className="breadcrumb__notebook-title">
            &#128211; {currentNotebook?.title}
          </div>
          <div className="breadcrumb__icons">
            <img
              src={editIcon}
              alt="edit notebook"
              className="breadcrumb__icon"
              onClick={handleClickEditIcon}
            />
            <img
              src={deleteIcon}
              alt="delete notebook"
              className="breadcrumb__icon"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </article>
  );
}
