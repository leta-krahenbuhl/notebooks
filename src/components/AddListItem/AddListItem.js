import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";

export default function AddListItem({ lists }) {
  const [allItems, setAllItems] = useState([]); //current ones??
  const [editedItem, setEditedItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { listId } = useParams();

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getItems = async () => {
    try {
      const data = await fetchListItems();
      // console.log(data); // array of objects
      const currentItemArr = data.filter((itemObj) => {
        return itemObj.list_id === parseInt(listId);
      });
      setAllItems(currentItemArr);
      // setIsTitle(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleSubmitItem = async (event) => {
    event.preventDefault();

    const newListItem = {
      text: event.target.listItem.value,
      list_id: parsedListId,
    };
    // put front-end form evaluation here

    try {
      const response = await axios.post(
        `${baseURL}/api/list-items`,
        newListItem
      );
      const updatedItem = response.data;

      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
      // setIsTitle(true);
      // setTitle(newListTitle);
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setEditedItem(item.id);
    console.log(item.id);
  };

  //make a new PUT utils function for this one. Call it handleItemEdit2. Later re-name handleItemEdit...
  const handleItemEdit = async (editedText, itemId) => {
    const updateItemObject = {
      id: itemId,
      text: editedText,
    };

    try {
      await editListItem(updateItemObject);

      setEditedItem(null);
    } catch (error) {
      return console.error(error);
    }

    getItems();
  };

  //     setAllItems((prevItems) =>
  //       prevItems.map((item) =>
  //         item.id === itemId ? { ...item, text: editedText } : item
  //       )
  //     );

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="add-list-items__item">
            {editedItem === item.id ? (
              <div>
                <input
                  type="text"
                  defaultValue={item.text}
                  onBlur={(e) => handleItemEdit(e.target.value, item.id)}
                />
              </div>
            ) : (
              <div onClick={() => handleItemClick(item)}>{item.text}</div>
            )}
            {/* {item.text}{" "} */}
            {/* <button
                onClick={handleClick}
                className="add-list-items__button"
              ></button> */}
          </li>
        ))}
      </ul>
      <form className="add-list-items-form" onSubmit={handleSubmitItem}>
        <div className="add-list-items-form__wrapper">
          <input
            type="text"
            className="add-list-items-form__input"
            name="listItem"
            placeholder="add list item"
          />
          <button className="add-list-items-form__button"></button>
        </div>
      </form>
    </div>
  );
}

//------------------------------------- ITEMS WITH EDIT BUTTON ON THE RIGHTS< BUT DOESNT WORK YET
// import "./AddListItem.scss";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchListItems } from "../../utils/AxiosRequests";

// export default function AddListItem({ lists }) {
//   const [allItems, setAllItems] = useState([]); //current ones??
//   const [isEdit, setIsEdit] = useState();
//   // const [inputValue, setInputValue] = useState("");
//   const { listId } = useParams();

//   const parsedListId = parseInt(listId);

//   const getItems = async () => {
//     try {
//       const data = await fetchListItems();
//       // console.log(data); // array of objects
//       const currentItemArr = data.filter((itemObj) => {
//         return itemObj.list_id === parseInt(listId);
//       });
//       setAllItems(currentItemArr);
//       // setIsTitle(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getItems();
//   }, []);

//   const handleSubmitItem = async (event) => {
//     event.preventDefault();

//     const newListItem = {
//       text: event.target.listItem.value,
//       list_id: parsedListId,
//     };
//     // put front-end form evaluation here

//     const baseURL = process.env.REACT_APP_BASE_URL;

//     try {
//       const response = await axios.post(
//         `${baseURL}/api/list-items`,
//         newListItem
//       );
//       const updatedItem = response.data;

//       setAllItems((prevItems) => [...prevItems, updatedItem]);

//       event.target.reset();
//       // setIsTitle(true);
//       // setTitle(newListTitle);
//     } catch (error) {
//       console.log(error);
//       // setIsError(true);
//     }
//   };

//   // const handleInputChange = (event) => {
//   //   setInputValue(event.target.value);
//   // };

//   const handleClick = () => {
//     console.log("click");
//   };

//   return (
//     <div className="add-list-items">
//       <ul className="add-list-items__list">
//         {allItems.map((item, index) => (
//           <li key={index} className="add-list-items__item">
//             {item.text}{" "}
//             <button
//               onClick={handleClick}
//               className="add-list-items__button"
//             ></button>
//           </li>
//         ))}
//       </ul>
//       <form className="add-list-items-form" onSubmit={handleSubmitItem}>
//         <div className="add-list-items-form__wrapper">
//           <input
//             type="text"
//             className="add-list-items-form__input"
//             name="listItem"
//             placeholder="add list item"
//           />
//           <button className="add-list-items-form__button"></button>
//         </div>
//       </form>
//     </div>
//   );
// }
