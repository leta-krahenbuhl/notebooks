import "./BottomNavigation.scss";
import plusIcon from "../../assets/images/icon-plus-grey.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function BottomNavigation() {
  const { notebookId, listId } = useParams();

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
            <p className="bottom-nav__text">ADD LIST</p>
          </div>
        </Link>
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
          <p className="bottom-nav__text1">ADD NOTEBOOK</p>
        </div>
      </Link>
    </div>
  );

  //in a notebook
  // if (notebookId && !listId)
  //   return (
  //     <>
  //       <nav className="notebook-navigation">
  //         <Link to={`/notebooks/${notebookId}/create/lists`}>
  //           <div className="notebook-navigation__wrapper">
  //             <img
  //               src={plusIcon}
  //               alt="add new list"
  //               className="notebook-navigation__icon-plus"
  //             />
  //             <img
  //               src={plusIconDesktop}
  //               alt="add new list"
  //               className="notebook-navigation__image-plus-desktop"
  //             />
  //             <p className="notebook-navigation__text">ADD LIST</p>
  //           </div>
  //         </Link>
  //       </nav>
  //     </>
  //   );

  // //in a list
  // if (notebookId && listId)
  //   return (
  //     <nav className="list-bottom-navigation">
  //       <button
  //         onClick={() => handleDeleteList(listId)}
  //         className="list-bottom-navigation__button-delete-mobile"
  //       ></button>
  //       <button
  //         onClick={() => handleDeleteList(listId)}
  //         className="list-bottom-navigation__button-delete-desktop"
  //       ></button>
  //       <Link to={`/notebooks/${notebookId}/lists/${listId}/edit`}>
  //         <img
  //           src={editIcon}
  //           alt="edit list"
  //           className="list-bottom-navigation__button-edit-mobile"
  //         />
  //         <img
  //           src={editIconDesktop}
  //           alt="edit list"
  //           className="list-bottom-navigation__button-edit-desktop"
  //         />
  //       </Link>
  //     </nav>
  //   );
}
