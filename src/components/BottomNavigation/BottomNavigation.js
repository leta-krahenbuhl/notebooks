import "./BottomNavigation.scss";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { deleteList } from "../../utils/AxiosRequests";
import plusIcon from "../../assets/images/plus.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BottomNavigation() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { notebookId, listId } = useParams();
  const navigate = useNavigate();

  const parsedNotebookId = parseInt(notebookId);

  const handleDeleteList = async (listId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this list? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteList(listId);
      } catch (error) {
        console.error(error);
      }

      navigate(`/notebooks/${notebookId}`);
    } else {
      console.log("List deletion canceled");
    }
  };

  //on home page
  if (!notebookId)
    return (
      <nav className="home-navigation">
        <Link to="/delete">
          <img
            src={deleteIcon}
            alt="delete notebook"
            className="home-navigation__image"
          />
        </Link>
        <Link to="/create/notebook">
          <img
            src={plusIcon}
            alt="add new notebook"
            className="home-navigation__image"
          />
        </Link>
        <Link to="/edit">
          <img
            src={editIcon}
            alt="edit notebook"
            className="home-navigation__image"
          />
        </Link>
      </nav>
    );

  //in a notebook
  if (notebookId && !listId)
    return (
      <nav className="notebook-navigation">
        <Link to={`/notebooks/${notebookId}/create-post`}>
          <img
            src={plusIcon}
            alt="add new list"
            className="notebook-navigation__image"
          />
        </Link>
      </nav>
    );

  //in a list
  if (notebookId && listId)
    return (
      <nav className="notebook-navigation">
        <button
          onClick={() => handleDeleteList(listId)}
          className="list__button-delete"
        ></button>
        <Link to={`/notebooks/${notebookId}/create/list`}>
          <img
            src={plusIcon}
            alt="add new list"
            className="notebook-navigation__image"
          />
        </Link>
        <Link to={`/notebooks/${notebookId}/lists/${listId}/edit`}>
          <img
            src={editIcon}
            alt="edit list"
            className="notebook-navigation__image"
          />
        </Link>
      </nav>
    );
}
