import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchListItems } from "../../utils/AxiosRequests";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./notebook.scss";

export default function Notebook() {
  const { notebookId } = useParams();

  // below is also in List-------------------------
  // const getAllListItems = async () => {
  //   try {
  //     const data = await fetchListItems();
  //     setAllListItems(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllListItems();
  // }, [listTitleswithNotebookId]);

  //took it out from here and put it in List-------below
  // const getItemsForTitles = (titles, items) => {
  //   const itemsByTitle = titles.map((title) => {
  //     const itemsForTitle = items.filter((item) => item.list_id === title.id);
  //     return { title, items: itemsForTitle };
  //   });
  //   return itemsByTitle;
  // };

  // const itemsForTitles = getItemsForTitles(
  //   listTitleswithNotebookId || [],
  //   allListItems || []
  // );

  //took it out from here and put it in List-------above

  return (
    <>
      <TopNavigation notebookId={notebookId} />
      <article className="notebook">
        {" "}
        <List notebookId={notebookId} />
      </article>
      <BottomNavigation />
    </>
  );
}

//--------------------- To Do
// Add journal entries here as well
// sort all List as well as JouralEntry components by date. Make date state in this component.
