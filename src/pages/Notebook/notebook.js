import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { fetchListItems } from "../../utils/AxiosRequests";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./notebook.scss";

export default function Notebook() {
  const [listTitleswithNotebookId, setListTitleswithNotebookId] =
    useState(null);
  const [allListItems, setAllListItems] = useState(null);

  const { notebookId } = useParams();

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

  const getAllListItems = async () => {
    try {
      const data = await fetchListItems();
      setAllListItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllListItems();
  }, [listTitleswithNotebookId]);

  const getItemsForTitles = (titles, items) => {
    const itemsByTitle = titles.map((title) => {
      const itemsForTitle = items.filter((item) => item.list_id === title.id);
      return { title, items: itemsForTitle };
    });

    return itemsByTitle;
  };

  const itemsForTitles = getItemsForTitles(
    listTitleswithNotebookId || [],
    allListItems || []
  );

  // console.log(itemsForTitles);

  return (
    <>
      <TopNavigation notebookId={notebookId} />
      <article className="notebook">
        {" "}
        {itemsForTitles && (
          <List itemsForTitles={itemsForTitles} notebookId={notebookId} />
        )}{" "}
      </article>
      <BottomNavigation notebookId={notebookId} />
    </>
  );
}

//--------------------- To Do
// Add journal entries here as well
// sort all List as well as JouralEntry components by date. Make date state in this component.
