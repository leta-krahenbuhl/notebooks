import "./BottomNavigation.scss";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import plusIcon from "../../assets/images/plus.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

//deleted notebookId as a prop, may cause issues later??
export default function BottomNavigation() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { notebookId, listId } = useParams();

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
  const parsedNotebookId = parseInt(notebookId);

  const navNotebookTitle = notebooks.find(
    (notebook) => notebook.id === parsedNotebookId
  );

  if (!notebookId)
    //meaning we're on home page
    return (
      <nav className="home-navigation">
        <Link to="/create/notebook">
          <img
            src={plusIcon}
            alt="add new notebook"
            className="home-navigation__image"
          />
        </Link>
        <Link to="/delete">
          <img
            src={deleteIcon}
            alt="add new notebook"
            className="home-navigation__image"
          />
        </Link>
      </nav>
    );

  if (notebookId && !listId)
    return (
      <nav className="notebook-navigation">
        <Link to={`/notebooks/${notebookId}/create/list`}>
          <img
            src={plusIcon}
            alt="add new list"
            className="notebook-navigation__image"
          />
        </Link>
      </nav>
    );

  if (notebookId && listId)
    return (
      <nav className="notebook-navigation">
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
