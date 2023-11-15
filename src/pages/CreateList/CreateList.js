import "./CreateList.scss";
import { useState } from "react";
import CreateListInput from "../../components/CreateListInput/CreateListInput";

export default function CreateList() {
  const [formValues, setFormValues] = useState([
    {
      label: "Name",
      type: "text",
      value: "",
    },
  ]);

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  return (
    // changed class name of div from App to create-list
    // use type checkbox once it's working
    <div className="create-list">
      <form>
        {formValues.map((obj, index) => (
          <CreateListInput
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
          />
        ))}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
