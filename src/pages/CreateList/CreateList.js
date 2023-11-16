import "./CreateList.scss";
import { useState, useRef } from "react";
import CreateListInput from "../../components/CreateListInput/CreateListInput";

export default function CreateList() {
  const [formValues, setFormValues] = useState([]);
  const [toggle, setToggle] = useState(false);

  const inputRef = useRef();
  const selectRef = useRef();

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: inputRef.current.value || "label",
      type: selectRef.current.value || "text",
      value: "",
    });
    setFormValues(values);
    setToggle(false);
  };

  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
  };

  const addBtnClick = (e) => {
    e.preventDefault();
    setToggle(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      formValues.map((val) => {
        return { [val.label]: val.value };
      })
    );
  };

  return (
    // changed class name of div from App to create-list
    // use type checkbox once it's working
    <div className="create-list">
      <h2 className="create-list__title">Add a new list</h2>
      <form onSubmit={handleSubmit}>
        {formValues.map((obj, index) => (
          <CreateListInput
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            deleteField={(e) => handleDeleteField(e, index)}
          />
        ))}
        {!toggle ? (
          <div className="center">
            <button className="add-btn" onClick={addBtnClick}>
              Add new
            </button>
          </div>
        ) : (
          <div className="dialog-box">
            <input type="text" placeholder="label" ref={inputRef} />
            <select ref={selectRef}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
            <button className="add-btn" onClick={handleAddField}>
              Add
            </button>
          </div>
        )}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
