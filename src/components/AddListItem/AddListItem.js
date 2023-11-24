import "./AddListItem.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListItems } from "../../utils/AxiosRequests";
import { editListItem } from "../../utils/AxiosRequests";
import { deleteItem } from "../../utils/AxiosRequests"; //move this into Item component

export default function AddListItem() {
  const [allItems, setAllItems] = useState([]); //only items for current list title
  const { listId } = useParams();
  const [isErrorNewItem, setIsErrorNewItem] = useState(false);

  const parsedListId = parseInt(listId);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getItems = async () => {
    const data = await fetchListItems();
    const currentItemArr = data.filter((itemObj) => {
      return itemObj.list_id === parseInt(listId);
    });
    return currentItemArr;
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setAllItems(data);
      })
      .catch(console.error);
  }, [getItems]);

  const handleUpateItem = async (updatedItem) => {
    await editListItem(updatedItem);
  };

  // add new list item
  const handleSubmitItem = async (event) => {
    event.preventDefault();

    setIsErrorNewItem(false);

    if (!event.target.listItem.value) {
      return setIsErrorNewItem(true);
    }

    if (!listId) {
      return alert("Please add a list title before adding list items.");
    }

    const newListItem = {
      text: event.target.listItem.value,
      list_id: parsedListId,
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/list-items`,
        newListItem
      );
      //without this I get a "each child has to have a uniuqe key error msg?
      const updatedItem = response.data;

      setIsErrorNewItem(false);
      setAllItems((prevItems) => [...prevItems, updatedItem]);

      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-list-items">
      <ul className="add-list-items__list">
        {allItems.map((item) => (
          <li key={item.id} className="add-list-items__item">
            <Item
              item={item}
              onItemUpdate={handleUpateItem}
              getItems={getItems}
            />
          </li>
        ))}
      </ul>
      <form className="add-list-items-form" onSubmit={handleSubmitItem}>
        <div className="add-list-items-form__wrapper">
          <input
            type="text"
            className={`${
              listId
                ? "add-list-items-form__input"
                : "add-list-items-form__input--inactive"
            }`}
            name="listItem"
            placeholder="add list item"
          />
          <button
            className={`${
              listId
                ? "add-list-items-form__button"
                : "add-list-items-form__button--inactive"
            }`}
          ></button>
        </div>
        {isErrorNewItem && (
          <p className="add-notebook-form__error">
            Please enter text for your item.
          </p>
        )}
      </form>
    </div>
  );
}

function Item({ item, onItemUpdate, getItems }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.text);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      return setIsError(true);
    }

    onItemUpdate({ id: item.id, text: value });
    setIsEditing(false);
    setIsError(false);
  };

  const handleDeleteItem = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const id = item.id;
        await deleteItem(id);
      } catch (error) {
        console.error(error);
      }
      // console.log("above getItems...");
      getItems();
    } else {
      //change this before submission
      console.log("Item deletion cancelled");
    }
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <button className="save-edit-list-item-button"></button>
          {isError && (
            <p className="add-notebook-form__error">
              Please enter text for your item.
            </p>
          )}
        </form>
      ) : (
        <div>
          <p>{value}</p>
          <button
            className="edit-list-items-button"
            onClick={() => setIsEditing(true)}
          ></button>
          <button
            className="delete-list-item-button"
            onClick={handleDeleteItem}
          ></button>
        </div>
      )}
    </>
  );
}

//----------- before taking getItems out of useEffect

// import "./AddListItem.scss";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchListItems } from "../../utils/AxiosRequests";
// import { editListItem } from "../../utils/AxiosRequests";
// import { deleteItem } from "../../utils/AxiosRequests"; //move this into Item component

// export default function AddListItem() {
//   const [allItems, setAllItems] = useState([]); //only items for current list title
//   const { listId } = useParams();
//   const [isErrorNewItem, setIsErrorNewItem] = useState(false);

//   const parsedListId = parseInt(listId);
//   const baseURL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     const getItems = async () => {
//       const data = await fetchListItems();
//       const currentItemArr = data.filter((itemObj) => {
//         return itemObj.list_id === parseInt(listId);
//       });
//       return currentItemArr;
//     };
//     getItems()
//       .then((data) => {
//         setAllItems(data);
//       })
//       .catch(console.error);
//   }, []);

//   const handleUpateItem = async (updatedItem) => {
//     await editListItem(updatedItem);
//   };

//   // add new list item
//   const handleSubmitItem = async (event) => {
//     event.preventDefault();

//     setIsErrorNewItem(false);

//     if (!event.target.listItem.value) {
//       return setIsErrorNewItem(true);
//     }

//     if (!listId) {
//       return alert("Please add a list title before adding list items.");
//     }

//     const newListItem = {
//       text: event.target.listItem.value,
//       list_id: parsedListId,
//     };

//     try {
//       const response = await axios.post(
//         `${baseURL}/api/list-items`,
//         newListItem
//       );
//       //without this I get a "each child has to have a uniuqe key error msg?
//       const updatedItem = response.data;

//       setIsErrorNewItem(false);
//       setAllItems((prevItems) => [...prevItems, updatedItem]);

//       event.target.reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="add-list-items">
//       <ul className="add-list-items__list">
//         {allItems.map((item) => (
//           <li key={item.id} className="add-list-items__item">
//             <Item item={item} onItemUpdate={handleUpateItem} />
//           </li>
//         ))}
//       </ul>

//       <form className="add-list-items-form" onSubmit={handleSubmitItem}>
//         <div className="add-list-items-form__wrapper">
//           <input
//             type="text"
//             className={`${
//               listId
//                 ? "add-list-items-form__input"
//                 : "add-list-items-form__input--inactive"
//             }`}
//             name="listItem"
//             placeholder="add list item"
//           />
//           <button
//             className={`${
//               listId
//                 ? "add-list-items-form__button"
//                 : "add-list-items-form__button--inactive"
//             }`}
//           ></button>
//         </div>
//         {isErrorNewItem && (
//           <p className="add-notebook-form__error">
//             Please enter text for your item.
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// function Item({ item, onItemUpdate }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [value, setValue] = useState(item.text);
//   const [isError, setIsError] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!value) {
//       return setIsError(true);
//     }

//     onItemUpdate({ id: item.id, text: value });
//     setIsEditing(false);
//     setIsError(false);
//   };

//   const handleDeleteItem = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item? This action cannot be undone."
//     );

//     if (confirmDelete) {
//       try {
//         const id = item.id;
//         await deleteItem(id);
//       } catch (error) {
//         console.error(error);
//       }
//       // getItems();
//     } else {
//       //change this before submission
//       console.log("Item deletion cancelled");
//     }
//   };

//   return (
//     <>
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={value}
//             onChange={(event) => {
//               setValue(event.target.value);
//             }}
//           />
//           <button className="save-edit-list-item-button"></button>
//           {isError && (
//             <p className="add-notebook-form__error">
//               Please enter text for your item.
//             </p>
//           )}
//         </form>
//       ) : (
//         <div>
//           <p>{value}</p>
//           <button
//             className="edit-list-items-button"
//             onClick={() => setIsEditing(true)}
//           ></button>
//           <button
//             className="delete-list-item-button"
//             onClick={handleDeleteItem}
//           ></button>
//         </div>
//       )}
//     </>
//   );
// }

//----------- works but when not edited before submitting edit it uses last default value
// import "./AddListItem.scss";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchListItems } from "../../utils/AxiosRequests";
// import { editListItem } from "../../utils/AxiosRequests";
// import { deleteItem } from "../../utils/AxiosRequests";
// import { useLocation } from "react-router-dom";

// export default function AddListItem() {
//   const [allItems, setAllItems] = useState([]); //only items for current list title
//   const [editedItemId, setEditedItemId] = useState(null);
//   const [editedItemValue, setEditedItemValue] = useState("");
//   const { notebookId, listId } = useParams();
//   const location = useLocation();
//   const [isErrorNewItem, setIsErrorNewItem] = useState(false);
//   const [isErrorEditItem, setIsErrorEditItem] = useState(false);

//   const parsedListId = parseInt(listId);
//   const baseURL = process.env.REACT_APP_BASE_URL;

//   //get items for current list title
//   const getItems = async () => {
//     try {
//       const data = await fetchListItems();
//       const currentItemArr = data.filter((itemObj) => {
//         return itemObj.list_id === parseInt(listId);
//       });
//       setAllItems(currentItemArr);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getItems();
//   }, []);

//   if (!listId) {
//   }

//   //add new list item
//   const handleSubmitItem = async (event) => {
//     event.preventDefault();

//     setIsErrorNewItem(false);

//     if (!event.target.listItem.value) {
//       return setIsErrorNewItem(true);
//     }

//     if (!listId) {
//       return alert("Please add a list title before adding list items.");
//     }

//     const newListItem = {
//       text: event.target.listItem.value,
//       list_id: parsedListId,
//     };

//     try {
//       const response = await axios.post(
//         `${baseURL}/api/list-items`,
//         newListItem
//       );
//       //without this I get a "each child has to have a uniuqe key error msg?
//       const updatedItem = response.data;

//       setIsErrorNewItem(false);
//       setAllItems((prevItems) => [...prevItems, updatedItem]);

//       event.target.reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleItemClick = (itemId) => {
//     // setIsError(false);
//     // setIsErrorEditItem(false);
//     setEditedItemId(itemId);
//   };

//   //save edited item
//   const handleSaveEditedItemClick = async (itemId) => {
//     handleItemClick();

//     setIsErrorEditItem(false);

//     if (!editedItemValue) {
//       console.log("detected empty valuuuue"); //works when form empty (or unchaged ugh)
//       setIsErrorEditItem(true);
//       return console.log(isErrorEditItem); // still false, why???
//     }

//     const updateItemObject = {
//       id: itemId,
//       text: editedItemValue,
//     };

//     try {
//       await editListItem(updateItemObject);
//       setEditedItemId(null);
//       setIsErrorEditItem(false);
//     } catch (error) {
//       return console.error(error);
//     }

//     getItems();
//   };

//   const handleDeleteItemClick = async (itemId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this item? This action cannot be undone."
//     );

//     if (confirmDelete) {
//       try {
//         await deleteItem(itemId);
//       } catch (error) {
//         console.error(error);
//       }
//       getItems();
//     } else {
//       //change this before submission
//       console.log("Item deletion cancelled");
//     }
//   };

//   //render the error message below if isErrorEditItem is true
//   return (
//     <div className="add-list-items">
//       <ul className="add-list-items__list">
//         {allItems.map((item) => (
//           <li key={item.id} className="add-list-items__item">
//             {editedItemId === item.id ? (
//               //display this for existing item that is currently being edited
//               <form>
//                 <input
//                   type="text"
//                   defaultValue={item.text}
//                   onChange={(event) => setEditedItemValue(event.target.value)}
//                 />
//                 <button
//                   className="save-edit-list-item-button"
//                   onClick={() => handleSaveEditedItemClick(item.id)}
//                 ></button>
//                 {/* can't get this to shop up... */}
//                 {isErrorEditItem && (
//                   <p className="add-notebook-form__error">
//                     Please enter text for your item.
//                   </p>
//                 )}
//               </form>
//             ) : (
//               // display this for other existing items
//               <div className="edit-list-items__wrapper">
//                 <div className="edit-list-items__text">{item.text}</div>
//                 <button
//                   className="edit-list-items-button"
//                   onClick={() => handleItemClick(item.id)}
//                 ></button>
//                 {location.pathname.endsWith("/edit") && (
//                   // <div className="delete-edit-wrapper">
//                   <button
//                     onClick={() => handleDeleteItemClick(item.id)}
//                     className="delete-list-item-button"
//                   ></button>
//                   // </div>
//                 )}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>

//       <form className="add-list-items-form" onSubmit={handleSubmitItem}>
//         <div className="add-list-items-form__wrapper">
//           <input
//             type="text"
//             className={`${
//               listId
//                 ? "add-list-items-form__input"
//                 : "add-list-items-form__input--inactive"
//             }`}
//             name="listItem"
//             placeholder="add list item"
//           />
//           <button
//             className={`${
//               listId
//                 ? "add-list-items-form__button"
//                 : "add-list-items-form__button--inactive"
//             }`}
//           ></button>
//         </div>
//         {isErrorNewItem && (
//           <p className="add-notebook-form__error">
//             Please enter text for your item.
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
