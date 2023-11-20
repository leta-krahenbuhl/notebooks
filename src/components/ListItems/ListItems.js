import "./ListItems.scss";
import { useParams } from "react-router-dom";
import { editListItemDone } from "../../utils/AxiosRequests";

export default function ListItems({ itemsForTitles }) {
  const { notebookId, listId } = useParams();

  // console.log(itemsForTitles);

  const handleClick = async (id, currentDoneValue) => {
    console.log(currentDoneValue);
    const newDoneValue = !currentDoneValue;

    const updateDoneObject = {
      id: id,
      done: newDoneValue,
    };

    try {
      await editListItemDone(updateDoneObject);
    } catch (error) {
      return console.error(error);
    }
  };

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
                    <li
                      key={itemIndex}
                      className="list-items__item"
                      onClick={() => handleClick(item.id, item.done)}
                    >
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

// on each item
// on click function, that
// sends a PUT request to list-items to update DONE to true, of item that was clicked on
