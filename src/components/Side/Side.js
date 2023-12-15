import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./Side.scss";

export default function Side() {
  const { notebookId } = useParams();

  return (
    <article className="side">
      <Header />
      <TopNavigation notebookId={notebookId} />
      <BottomNavigation />
    </article>
  );
}
