import "./TopNavigation.scss";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";
import { Link, useParams } from "react-router-dom";
import { fetchListTitles } from "../../utils/AxiosRequests";

export default function TopNavigation() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { notebookId, listId } = useParams();
  const [currentListTitleObj, setCurrentListTitleObj] = useState("");
  const [listTitleswithNotebookId, setListTitleswithNotebookId] =
    useState(null);

  //to run useEffect2
  const getArrayOfListTitlesWithNotebookId = async () => {
    try {
      const data = await fetchListTitles();

      const arrayOfListTitleswithNotebookId = data.filter(
        (notebook) => notebook.notebook_id === parseInt(notebookId)
      );
      setListTitleswithNotebookId(arrayOfListTitleswithNotebookId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArrayOfListTitlesWithNotebookId();
  }, [notebookId]);

  //useEffect2 : get current list title for TopNaviation
  useEffect(() => {
    if (listTitleswithNotebookId) {
      const result = listTitleswithNotebookId.find(
        (listTitle) => listTitle.id === parseInt(listId)
      );
      setCurrentListTitleObj(result);
    }
  }, [listTitleswithNotebookId, listId]);

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
        {currentListTitleObj && (
          <>
            {" "}
            |{" "}
            <Link to={`/notebooks/${notebookId}/lists/${listId}`}>
              {" "}
              {currentListTitleObj.title}
            </Link>
          </>
        )}
      </h2>
    </>
  );
}
