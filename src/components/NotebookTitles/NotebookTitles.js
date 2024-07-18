import "./NotebookTitles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchNotebookTitles,
  editNotebookTitle,
  deleteNotebook,
} from "../../utils/AxiosRequests";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";

export default function NotebookTitles() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notebookToEdit, setNotebookToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [hoveredNotebookId, setHoveredNotebookId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { notebookId } = useParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get("edit");
    if (editId) {
      setNotebookToEdit(parseInt(editId, 10));
    }
  }, [location]);

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

  const handleClickEditIcon = (id) => {
    setNotebookToEdit(id);
    navigate(`?edit=${id}`);
  };

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
  };

  return (
    <div className="notebook">
      {notebooks.map((notebook) => {
        return (
          <div
            className="notebook__wrapper"
            key={notebook.date}
            onMouseEnter={() => setHoveredNotebookId(notebook.id)}
            onMouseLeave={() => setHoveredNotebookId(null)}
          >
            {/* eslint-disable-next-line */}
            {notebookToEdit == notebook.id ? (
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
              <div className="notebook__wrapper-single">
                <Link to={`/notebooks/${notebook.id}`}>
                  <h2
                    className={`notebook__title ${
                      // eslint-disable-next-line
                      notebook.id == notebookId
                        ? "notebook__title--highlight"
                        : ""
                    }`}
                  >
                    &#128211; {notebook.title}
                  </h2>
                </Link>
                {/* eslint-disable-next-line */}
                {notebook.id == notebookId && (
                  <div className="notebook__icons-tablet">
                    <img
                      src={editIcon}
                      alt="edit notebook"
                      className="notebook__icon notebook__icon--tablet"
                      onClick={() => handleClickEditIcon(notebook.id)}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete notebook"
                      className="notebook__icon"
                      onClick={() => handleDelete(notebook.id)}
                    />
                  </div>
                )}
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
            )}
          </div>
        );
      })}
    </div>
  );
}
