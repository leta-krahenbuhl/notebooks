import "./AddListTitle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { useEffect, useState } from "react";

export default function AddListTitle() {
  const [isTitle, setIsTitle] = useState(false);
  const [titleArr, setTitleArr] = useState("");
  const [title, setTitle] = useState(""); //used as a dependency for rendering titleArr
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { notebookId, listId } = useParams();
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (listId) {
      const getTitles = async () => {
        try {
          const data = await fetchListTitles();
          const currentTitleArr = data.filter((titleObj) => {
            return titleObj.id === parseInt(listId);
          });
          setTitleArr(currentTitleArr);
          setIsTitle(true);
        } catch (error) {
          console.error(error);
        }
      };

      getTitles();
    }
  }, [title]);

  const handleSubmitTitle = async (event) => {
    event.preventDefault();
    setIsError(false);

    if (!event.target.text.value) {
      return setIsError(true);
    }

    //create a new list
    if (!listId) {
      const parsedNotebookId = parseInt(notebookId);

      const newListTitle = {
        title: event.target.text.value,
        notebook_id: parsedNotebookId,
      };

      try {
        const response = await axios.post(
          `${baseURL}/api/list-titles`,
          newListTitle
        );

        const newListTitleId = response.data.id;

        setIsError(false);
        setTitle(newListTitle);
        setIsTitle(true);

        navigate(`/notebooks/${notebookId}/create/list/${newListTitleId}`);

        event.target.reset();
      } catch (error) {
        console.log(error);
      }
    }

    //edit an existing list
    if (listId) {
      const parsedNotebookId = parseInt(notebookId);

      setIsError(false);

      if (!event.target.text.value) {
        return setIsError(true);
      }

      const newListTitle = {
        id: listId,
        title: event.target.text.value,
      };

      try {
        const response = await axios.put(
          `${baseURL}/api/list-titles`,
          newListTitle
        );

        setIsError(false);
        setTitle(newListTitle);
        setIsTitle(true);

        event.target.reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //isTitle(false) means it displays input field
  const handleClick = () => {
    setIsTitle(false);
  };

  //If there's no listId it means we are adding a new list, not editing a current one
  if (!isTitle && !listId) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <h2 className="add-list-title-form__header">ADD LIST</h2>
          <div className="add-list-title-form__wrapper">
            <input
              type="text"
              id="text"
              name="text"
              placeholder="add list title"
              className="add-list-title-form__input"
            />
            <button className="add-list-title-form__button"></button>
            {isError && (
              <p className="add-notebook-form__error">
                Please enter a list title.
              </p>
            )}
          </div>
        </form>
      </>
    );
  }

  //If isTitle===false it means the input field is being displayed
  //If there's a listId it means we're eiditng an existing list title
  if (!isTitle && listId) {
    return (
      <>
        <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
          <h2 className="add-list-title-form__header">EDIT LIST</h2>
          <div className="add-list-title-form__wrapper">
            <input
              type="text"
              id="text"
              name="text"
              placeholder="add list title"
              className="add-list-title-form__input"
              defaultValue={
                titleArr && titleArr.length > 0 ? titleArr[0].title : ""
              }
            />
            <button className="add-list-title-form__button"></button>
          </div>
        </form>
        {isError && (
          <p className="add-list-title-form__error">
            Please enter a list title.
          </p>
        )}
      </>
    );
  }

  // If isTitle===true it means the title is being displayed, not the input form
  if (isTitle) {
    return (
      <>
        <h2 className="add-list-title-form__header">EDIT LIST</h2>
        <article className="edit-form">
          <h3 className="add-list-title-form__list-title">
            {titleArr && titleArr.length > 0 ? titleArr[0].title : ""}
          </h3>
          <img
            onClick={() => handleClick(titleArr[0].title)}
            className="edit-list-title-form__button"
          ></img>
        </article>
      </>
    );
  }
}
