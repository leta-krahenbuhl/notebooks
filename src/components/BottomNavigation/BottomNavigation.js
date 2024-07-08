import "./BottomNavigation.scss";
import { deleteList } from "../../utils/AxiosRequests";
import plusIcon from "../../assets/images/plus.svg";
import editIcon from "../../assets/images/edit-white.svg";
// import deleteIcon from "../../assets/images/delete.svg";
import deleteIconDesktop from "../../assets/images/trash-black.svg";
import plusIconDesktop from "../../assets/images/icon-plus-grey.svg";
import editIconDesktop from "../../assets/images/edit-black.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const { notebookId, listId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteList = async (listId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this list? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        await deleteList(listId);
      } catch (error) {
        console.error(error);
      }
      navigate(`/notebooks/${notebookId}`);
    }
  };

  //on home page
  if (!notebookId)
    return (
      <nav className="home-navigation">
        <Link to="/create/notebook" className="home-navigation__a">
          <div className="home-navigation__wrapper">
            <img
              src={plusIcon}
              alt="add new notebook"
              className="home-navigation__image-plus"
            />
            <img
              src={plusIconDesktop}
              alt="add new notebook"
              className="home-navigation__image-plus-desktop"
            />
            <p className="home-navigation__text">ADD NOTEBOOK</p>
          </div>
        </Link>
      </nav>
    );

  //in a notebook
  if (notebookId && !listId)
    return (
      <>
        <nav className="notebook-navigation">
          <Link to={`/notebooks/${notebookId}/create/lists`}>
            <p className="home-navigation__text">add list</p>

            <img
              src={plusIcon}
              alt="add new list"
              className="notebook-navigation__icon-plus"
            />
            <img
              src={plusIconDesktop}
              alt="add new list"
              className="home-navigation__image-plus-desktop"
            />
          </Link>
        </nav>
      </>
    );

  //in a list
  if (notebookId && listId)
    return (
      <nav className="list-bottom-navigation">
        <button
          onClick={() => handleDeleteList(listId)}
          className="list-bottom-navigation__button-delete-mobile"
        ></button>
        <button
          onClick={() => handleDeleteList(listId)}
          className="list-bottom-navigation__button-delete-desktop"
        ></button>
        <Link to={`/notebooks/${notebookId}/lists/${listId}/edit`}>
          <img
            src={editIcon}
            alt="edit list"
            className="list-bottom-navigation__button-edit-mobile"
          />
          <img
            src={editIconDesktop}
            alt="edit list"
            className="list-bottom-navigation__button-edit-desktop"
          />
        </Link>
      </nav>
    );
}
