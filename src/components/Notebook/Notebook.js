import List from "../List/List";
import "./Notebook.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";

export default function Notebook() {
  const [listTitles, setListTitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { notebookId } = useParams();
  // console.log(notebookId); //works

  const getListTitlesWithNotebookId = async () => {
    try {
      const data = await fetchListTitles();
      setListTitles(data);
      setIsLoading(false);

      const listTitleswithNotebookId = data.filter(
        (notebook) => notebook.notebook_id === parseInt(notebookId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListTitlesWithNotebookId();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(listTitles); //works

  //--- List1,2,3,4,....
  // get list title where notebook_id = notebookId
  // get all list items where list_id = is the id of the result of the previous map
  // display these two underneath each other

  // repeat for all list titles

  //--- Journal Entry1,2,3,4,....
  // get journal where notebook_id = notebookId
  // get all journal entries where journal_id = is the id of the result of the previous map
  // display the entries

  // repeat for all journals

  // sort all these components by date. Make date state in this component.

  return (
    <>
      <h2 className="notebook">
        All pages from one notebook here please thank you.{" "}
      </h2>
      <List />
    </>
  );
}
