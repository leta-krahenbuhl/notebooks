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
      // console.log(listTitleswithNotebookId); //works! for different notebooks!
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListTitlesWithNotebookId();
  }, [notebookId]);

  // need to get listItems!
  // const listItemsByTitle = getListTitlesWithNotebookId.map((title) => {
  //   const items = listItems.filter((item) => item.list_id === title.id);
  //   return { title, items };
  // });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(listTitles); //works

  //--------------------- PSEUDO CODE

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

//---- TO DO CHECK BELOW

// Assuming listTitles and listItems contain your data
// const listTitles = [
//   { id: 1, notebook_id: 1, title: "Title 1" },
//   { id: 2, notebook_id: 2, title: "Title 2" },
// ...other list titles
// ];

// const listItems = [
//   { id: 1, list_id: 1, content: "Item 1" },
//   { id: 2, list_id: 1, content: "Item 2" },
// ...other list items
// ];

// For each matching list title, find associated list items
// const listItemsByTitle = filteredListTitles.map((title) => {
//   const items = listItems.filter((item) => item.list_id === title.id);
//   return { title, items };
// });

// listItemsByTitle will contain an array of objects, each object representing a title with its associated items
// console.log(listItemsByTitle);
