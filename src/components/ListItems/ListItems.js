import "./ListItems.scss";
import { useParams } from "react-router-dom";
import { editListItemDone } from "../../utils/AxiosRequests";

export default function ListItems({ itemsForTitles, getAllListItems, listId }) {
  // if (!listId) {
  //   const { notebookId, listId } = useParams();
  // }

  console.log(listId);

  const handleClick = async (id, currentDoneValue) => {
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

    getAllListItems();
  };

  return (
    <>
      <div className="list-items">
        {console.log("items rendering!")}
        {/* {console.log(itemsForTitles)} */}
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <ul className="list-items__text">
              {titleObj.items
                .filter((item) => {
                  // {
                  //   console.log(item);
                  // }
                  return item.list_id === parseInt(listId);
                })
                .map((item, itemIndex) => {
                  {
                    //this one is not working in the notebook (on List.js)!
                    console.log(item);
                  }
                  const listItemClass = `${
                    !item.done ? "list-items__item" : "list-items__item--true"
                  }`;
                  return (
                    <li
                      key={itemIndex}
                      className={listItemClass}
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
