import "./ListDetail.scss";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import ListItems from "../../components/ListItems/ListItems";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { fetchListItems } from "../../utils/AxiosRequests";

export default function Home() {
  // ------------- this whole thing is also in notebook.js... make DRYer?
  const [listTitleswithNotebookId, setListTitleswithNotebookId] =
    useState(null);
  const [allListItems, setAllListItems] = useState(null);
  const [currentListTitleObj, setCurrentListTitleObj] = useState("");

  const { notebookId, listId } = useParams();

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
  // ---------------------------------- end

  // // ----------------- to get current list title for TopNaviations: below
  // useEffect(() => {
  //   if (listTitleswithNotebookId) {
  //     const result = listTitleswithNotebookId.find(
  //       (listTitle) => listTitle.id === parseInt(listId)
  //     );
  //     setCurrentListTitleObj(result);
  //   }
  // }, [listTitleswithNotebookId, listId]);
  // // ----------------- to get current list title for TopNaviations: above

  return (
    <>
      <TopNavigation
        notebookId={notebookId}
        currentListTitleObj={currentListTitleObj}
      />
      <main className="main-list-detail">
        <ListItems
          itemsForTitles={itemsForTitles}
          getAllListItems={getAllListItems}
          listId={listId}
        />
      </main>
      <BottomNavigation />
    </>
  );
}
