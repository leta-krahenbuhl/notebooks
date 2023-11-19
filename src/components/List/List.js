import { Link } from "react-router-dom";
import "./List.scss";
import ListItems from "../ListItems/ListItems";

export default function List({ itemsForTitles, notebookId }) {
  return (
    <>
      <div className="list">
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <Link to={`/notebooks/${notebookId}/lists/${titleObj.title.id}`}>
              <h2 className="list__title">{titleObj.title.title}</h2>
            </Link>
            <ListItems itemsForTitles={itemsForTitles} />
          </div>
        ))}
      </div>
    </>
  );
}
