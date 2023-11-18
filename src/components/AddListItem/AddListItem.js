import "./AddListItem.scss";
import axios from "axios";

export default function AddListItem() {
  const handleSubmitItem = async (event) => {
    event.preventDefault();

    const newListItem = {
      text: event.target.listItem.value,
    };
    // put front-end form evaluation here

    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      await axios.post(`${baseURL}/api/list-items`, newListItem);
      // setIsError(false);
      event.target.reset();
      // setIsTitle(true);
      // setTitle(newListTitle);
    } catch (error) {
      console.log(error);
      // setIsError(true);
    }
  };

  return (
    <div className="add-list-item">
      <h3 className="add-list-item__header">start your list:</h3>
      <form className="add-list-item-form" onSubmit={handleSubmitItem}>
        <input
          type="text"
          className="add-list-item-form__input"
          name="listItem"
        />
        <button className="save">SAVE</button>
      </form>
    </div>
  );
}
