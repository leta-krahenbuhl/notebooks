import "./ListItems.scss";
import { useParams } from "react-router-dom";

export default function ListItems({ itemsForTitles }) {
  const { notebookId, listId } = useParams();

  return (
    <>
      <div className="list-items">
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <ul className="list-items__text">
              {titleObj.items
                .filter((item) => {
                  return item.list_id === parseInt(listId);
                })
                .map((item, itemIndex) => {
                  return (
                    <li key={itemIndex} className="list-items__item">
                      {item.text}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
