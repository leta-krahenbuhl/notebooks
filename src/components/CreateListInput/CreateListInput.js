import "./CreateListInput.scss";
import React from "react";

export default function CreateListInput({
  objValue,
  onChange,
  index,
  deleteField,
}) {
  const { label, type, value } = objValue;
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
        <div onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
}
