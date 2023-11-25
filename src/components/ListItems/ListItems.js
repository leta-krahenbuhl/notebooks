import "./ListItems.scss";
import { editListItemDone } from "../../utils/AxiosRequests";
import iconSquareDone from "../../assets/images/square-done.svg";
import iconSquareEmpty from "../../assets/images/square-empty.svg";

export default function ListItems({
  itemsForTitles,
  getAllListItems,
  listIdForTitle,
  listId,
}) {
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
        {/* itemsForTitles is an array of objects. Each object has two properties
         items and title. Items is an array with objects. Title is an object.*/}
        {/* {console.log(itemsForTitles)} */}

        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <ul className="list-items__text">
              {/* titleObj is an Object with two properties, items and title. 
               Items is an array with objects. Title is an object.*/}
              {console.log(titleObj)}

              {titleObj.items
                .filter((item) => {
                  return (
                    item.list_id === parseInt(listId ? listId : listIdForTitle)
                  );
                })
                .map((item, itemIndex) => {
                  const uniqueKey = `${index}-${itemIndex}`;
                  return (
                    <div key={uniqueKey} className="list-items__wrapper">
                      <li className="list-items__item">{item.text}</li>
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

//------- what worked before

// return (
//   <>
//     <div className="list-items">
//       {/* itemsForTitles is an array of objects. Each object has two properties
//        items and title. Items is an array with objects. Title is an object.*/}
//       {/* {console.log(itemsForTitles)} */}

//       {itemsForTitles.map((titleObj, index) => (
//         <div key={index}>
//           <ul className="list-items__text">
//             {/* titleObj is an Object with two properties, items and title.
//              Items is an array with objects. Title is an object.*/}
//             {/* {console.log(titleObj)} */}

//             {titleObj.items
//               .filter((item) => {
//                 return item.list_id === parseInt(listId);
//               })
//               .map((item, itemIndex) => {
//                 const uniqueKey = `${index}-${itemIndex}`;
//                 return (
//                   <div key={uniqueKey} className="list-items__wrapper">
//                     <li className="list-items__item">{item.text}</li>
//                     {item.done ? (
//                       <img
//                         className="list-items__square"
//                         src={iconSquareDone}
//                         alt="ticked box"
//                         onClick={() => handleClick(item.id, item.done)}
//                       />
//                     ) : (
//                       <img
//                         className="list-items__square"
//                         src={iconSquareEmpty}
//                         alt="unticked box"
//                         onClick={() => handleClick(item.id, item.done)}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//           </ul>
//         </div>
//       ))}
//     </div>
//     <div className="border"></div>
//   </>
// );
