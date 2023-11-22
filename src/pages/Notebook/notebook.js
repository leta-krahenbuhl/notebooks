import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchListItems } from "../../utils/AxiosRequests";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./notebook.scss";

export default function Notebook() {
  const { notebookId } = useParams();

  return (
    <>
      <TopNavigation notebookId={notebookId} />
      <article className="notebook">
        <List notebookId={notebookId} />
      </article>
      <BottomNavigation />
    </>
  );
}

//--------------------- To Do
// Add journal entries here as well
// sort all List as well as JouralEntry components by date. Make date state in this component.
