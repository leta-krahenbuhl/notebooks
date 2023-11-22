import { Link, useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import "./CreatePost.scss";

export default function CreatePost() {
  const { notebookId } = useParams();

  return (
    <>
      <TopNavigation notebookId={notebookId} />
      <article className="create-post">
        <h2 className="create-post__header">CREATE</h2>
        <nav className="create-post__list">
          <Link to={`/notebooks/${notebookId}/create-post/list/`}>
            <p className="create-post__item">NEW LIST</p>
          </Link>
          <Link to={`/notebooks/${notebookId}/create/journal/`}>
            <p className="create-post__item">NEW JOURNAL</p>
          </Link>
          <Link to={`/notebooks/${notebookId}`}>
            <button className="create-post__cancel-button">CANCEL</button>
          </Link>
        </nav>
      </article>
      {/* <BottomNavigation /> */}
    </>
  );
}

//--------------------- To Do
// Add journal entries here as well
// sort all List as well as JouralEntry components by date. Make date state in this component.
