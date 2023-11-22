import "./TopNavigation.scss";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { Link, useParams } from "react-router-dom";

// deleted notebookId as a received prop and defined it in here myself, may cause issues later
// can I get the list title without updating the URL
export default function TopNavigation({ currentListTitleObj }) {
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

  return (
    <>
      <h2 className="top-navigation">
        <Link to={`/notebooks/${notebookId}`}> {navNotebookTitle.title} </Link>
        {currentListTitleObj && <> | {currentListTitleObj.title}</>}
      </h2>
    </>
  );
}
