import "./BottomNavigation.scss";
import plusIcon from "../../assets/images/icon-plus-grey.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function BottomNavigation() {
  const { notebookId } = useParams();

  // if in a notebook
  if (notebookId)
    return (
      <div className="bottom-nav">
        <Link
          to={`/notebooks/${notebookId}/create/lists/`}
          className="bottom-nav__a"
        >
          <div className="bottom-nav__wrapper">
            <img
              src={plusIcon}
              alt="add new notebook"
              className="bottom-nav__image-plus-desktop"
            />
            <p className="bottom-nav__text">LIST</p>
          </div>
        </Link>
        <Link to="/create/notebook" className="bottom-nav__a">
          <div className="bottom-nav__wrapper">
            <img
              src={plusIcon}
              alt="add new notebook"
              className="bottom-nav__image-plus-desktop"
            />
            <p className="bottom-nav__text">NOTEBOOK</p>
          </div>
        </Link>
        <Link
          to={`/notebooks/${notebookId}/create/habit-tracker`}
          className="bottom-nav__a"
        >
          <div className="bottom-nav__wrapper">
            <img
              src={plusIcon}
              alt="add new habit tracker"
              className="bottom-nav__image-plus-desktop"
            />
            <p className="bottom-nav__text">HABIT TRACKER</p>
          </div>
        </Link>
      </div>
    );

  // when no notebookId (so should be in home)
  return (
    <div className="bottom-nav">
      <Link to="/create/notebook" className="bottom-nav__a">
        <div className="bottom-nav__wrapper">
          <img
            src={plusIcon}
            alt="add new notebook"
            className="bottom-nav__image-plus-desktop"
          />
          <p className="bottom-nav__text">ADD NOTEBOOK</p>
        </div>
      </Link>
    </div>
  );
}
