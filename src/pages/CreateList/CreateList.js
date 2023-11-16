import "./CreateList.scss";
import { useState, useRef } from "react";
import ListItemInput from "../../components/ListItemInput/ListItemInput";

export default function CreateList() {
  const [listItems, setlistItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  const inputRefItem = useRef();
  const checkboxRef = useRef();
  //   const selectRef = useRef();

  const handleChange = (event, index) => {
    const values = [...listItems];
    values[index].value = event.target.value;
    setlistItems(values);
  };

  const handleAddToList = (event) => {
    event.preventDefault();
    const listItemsCurrent = [...listItems];
    listItemsCurrent.push({
      //: TO DO validation here if list item empty
      //   type: selectRef.current.value || "text",
      value: inputRefItem.current.value,
    });
    setlistItems(listItemsCurrent);
    setToggle(false);
  };

  const handleDeleteField = (_event, index) => {
    const values = [...listItems];
    values.splice(index, 1);
    setlistItems(values);
  };

  const handleAddListItemField = (event) => {
    event.preventDefault();

    setToggle(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      listItems.map((item) => {
        return item.value;
      })
    );
    setlistItems([]);
  };

  return (
    // changed class name of div from App to create-list
    // use type checkbox once it's working
    <div className="create-list">
      <h2 className="create-list__title">ADD LIST</h2>
      <form onSubmit={handleSubmit}>
        {listItems.map((item, index) => (
          <ListItemInput
            key={index}
            itemValue={item}
            onChange={handleChange}
            index={index}
            deleteField={(event) => handleDeleteField(event, index)}
          />
        ))}
        {/* ADD LIST ITEM button shows up when toggle is false
        eg no one clicked on add list item.
        If toggle is true someone clicked on ADD LIST ITEM BUTTON
        so we see the input field
        */}
        {!toggle ? (
          <div className="center">
            <button className="add-btn" onClick={handleAddListItemField}>
              ADD LIST ITEM
            </button>
          </div>
        ) : (
          <div className="dialog-box">
            <input type="text" placeholder="item" ref={inputRefItem} />
            {/* <input type="checkbox" placeholder="checkbox?" ref={checkboxRef} /> */}

            {/* <select ref={selectRef}>
              <option value="text">Text</option>
            </select> */}
            <button className="add-btn" onClick={handleAddToList}>
              ADD TO LIST
            </button>
          </div>
        )}
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
