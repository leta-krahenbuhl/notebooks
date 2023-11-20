import { Link } from "react-router-dom";
import "./List.scss";

export default function List({ itemsForTitles, notebookId }) {
  // console.log(itemsForTitles); //works

  return (
    <>
      <div className="list">
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <Link to={`/notebooks/${notebookId}/lists/${titleObj.title.id}`}>
              <h2 className="list__title">{titleObj.title.title}</h2>
            </Link>
            <ul className="list__text">
              {titleObj.items.map((item, itemIndex) => (
                <li key={itemIndex} className="list__item">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
