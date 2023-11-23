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

  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

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
      console.log("Notebook deletion canceled");
    }
  };

  const handleClickEditIcon = async (id) => {
    setNotebookToEdit(id);
    // console.log(notebookToEdit); //doesn't work immediately cause of re-render!
  };

  //----------------------------------------------- on page load and delete render
  if (location.pathname === "/" || location.pathname === "/delete") {
    return (
      <>
        {notebooks.map((notebook) => {
          return (
            <div className="notebook__wrapper" key={notebook.date}>
              <Link to={`/notebooks/${notebook.id}`}>
                <h2 className="notebook__title">{notebook.title}</h2>
              </Link>
              {location.pathname === "/delete" && (
                <button
                  onClick={() => handleDelete(notebook.id)}
                  className="notebook__button-delete"
                ></button>
              )}
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

  //----------------------------------------------- edit functionality & render
  const handleSaveTitle = async (event, id) => {
    event.preventDefault();

    const parsedNotebookId = parseInt(id);

    try {
      await editNotebookTitle({ id: parsedNotebookId, title: editedTitle });
      setNotebookToEdit(null);
    } catch (error) {
      return console.error(error);
    }

    getNotebookTitles();
    navigate(`/`);
  };

  if (location.pathname === "/edit") {
    return (
      <>
        {notebooks.map((notebook) => {
          return (
            <div className="notebook__wrapper" key={notebook.date}>
              {notebookToEdit === notebook.id ? (
                //if notebook title id is the one that is being edited, display the following:
                <form>
                  <input
                    type="text"
                    defaultValue={notebook.title}
                    onChange={(event) => setEditedTitle(event.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={(event) => handleSaveTitle(event, notebook.id)}
                    className="notebook__button-save"
                  ></button>
                </form>
              ) : (
                //if notebook title id is NOT the one that is being edited, display the following:
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

  // return (
  //   <>
  //     {notebooks.map((notebook) => {
  //       return (
  //         <div className="notebook__wrapper" key={notebook.date}>
  //           {notebookToEdit === notebook.id ? (
  //             <div>
  //               <input
  //                 type="text"
  //                 defaultValue={notebook.title}
  //                 // onBlur={(e) => handleItemEdit(e.target.value, item.id)}
  //               />
  //             </div>
  //           ) : (
  //             <Link to={`/notebooks/${notebook.id}`}>
  //               <h2 className="notebook__title">{notebook.title}</h2>
  //             </Link>
  //           )}

  //           {location.pathname === "/delete" && (
  //             <button
  //               onClick={() => handleDelete(notebook.id)}
  //               className="notebook__button-delete"
  //             ></button>
  //           )}
  //           {location.pathname === "/edit" && (
  //             <button
  //               onClick={() => handleClickEditIcon(notebook.id)}
  //               className="notebook__button-edit"
  //             ></button>
  //           )}
  //         </div>
  //       );
  //     })}
  //   </>
  // );
}
