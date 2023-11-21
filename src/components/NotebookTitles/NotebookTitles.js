import "./NotebookTitles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { deleteNotebook } from "../../utils/AxiosRequests";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname); // logs /delete

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
    //are you sure you want to delete this notebook pop-up!!!

    try {
      await deleteNotebook(id);
    } catch (error) {
      console.error(error);
    }
    navigate(`/`);

    getNotebookTitles();
  };

  return (
    <>
      {notebooks.map((notebook) => {
        return (
          <div className="notebook__wrapper" key={notebook.date}>
            <Link to={`/notebooks/${notebook.id}`}>
              <h2 className="notebook__title">{notebook.title}</h2>
            </Link>
            <button
              onClick={() => handleDelete(notebook.id)}
              className="notebook__button-delete"
            ></button>
          </div>
        );
      })}
    </>
  );
}
