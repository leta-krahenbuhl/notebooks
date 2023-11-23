import List from "../../components/List/List";
import { useParams } from "react-router-dom";
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
