import "./ListItems.scss";
import { editListItemDone } from "../../utils/AxiosRequests";
import iconSquareDone from "../../assets/images/square-done.svg";
import iconSquareEmpty from "../../assets/images/square-empty.svg";

export default function ListItems({ itemsForTitles, getAllListItems, listId }) {
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
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <ul className="list-items__text">
              {titleObj.items
                .filter((item) => {
                  return item.list_id === parseInt(listId);
                })
                .map((item, itemIndex) => {
                  // const listItemClass = `${
                  //   !item.done ? "list-items__item" : "list-items__item--true"
                  // }`;
                  return (
                    <div className="list-items__wrapper">
                      <li key={itemIndex} className="list-items__item">
                        {item.text}
                      </li>
                      {item.done ? (
                        <img
                          className="list-items__square"
                          src={iconSquareDone}
                          alt="ticked box"
                          onClick={() => handleClick(item.id, item.done)}
                        />
                      ) : (
                        <img
                          className="list-items__square"
                          src={iconSquareEmpty}
                          alt="unticked box"
                          onClick={() => handleClick(item.id, item.done)}
                        />
                      )}
                    </div>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border"></div>
    </>
  );
}
