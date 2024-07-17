import "./Breadcrumb.scss";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { useEffect, useState } from "react";

export default function Breadcrumb() {
  const [currentNotebook, setCurrentNotebook] = useState(null);

  const location = useLocation();
  const { notebookId } = useParams();

  //get notebook titles and find the one that matches notebookId
  const getNotebookTitles = async () => {
    try {
      const data = await fetchNotebookTitles();
      const currentNotebook = data.find((notebook) => {
        return notebook.id === parseInt(notebookId);
      });
      setCurrentNotebook(currentNotebook);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotebookTitles();
  }, [notebookId]);

  return (
    <article className="breadcrumb">
      {currentNotebook ? (
        <div className="breadcrumb__notebook-title">
          &#128211; {currentNotebook.title}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </article>
  );
}
