import { useParams } from "react-router-dom";
import "./List.scss";
import ListItems from "../ListItems/ListItems";
import { fetchListItems } from "../../utils/AxiosRequests";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { deleteList } from "../../utils/AxiosRequests";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [allListItems, setAllListItems] = useState(null);
  const [listTitleswithNotebookId, setListTitleswithNotebookId] =
    useState(null);
  const [hoveredListTitleId, setHoveredListTitleId] = useState(null);
  const { notebookId, listId } = useParams(); // listId undefined?
  const navigate = useNavigate();

  // get list titles with notebook id
  const getArrayOfListTitlesWithNotebookId = async () => {
    try {
      const data = await fetchListTitles();

      const arrayOfListTitleswithNotebookId = data.filter(
        (notebook) => notebook.notebook_id === parseInt(notebookId)
      );

      const titlesByDate = arrayOfListTitleswithNotebookId.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setListTitleswithNotebookId(titlesByDate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArrayOfListTitlesWithNotebookId();
    // eslint-disable-next-line
  }, [notebookId]);

  // get all items from a list
  const getAllListItems = async () => {
    try {
      const data = await fetchListItems();
      setAllListItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllListItems();
  }, []);

  //only gets items for titles that are in this notebook
  const getItemsForTitles = (titles, items) => {
    const itemsByTitle = titles.map((title) => {
      const itemsForTitle = items.filter((item) => item.list_id === title.id);

      return { title, items: itemsForTitle };
    });
    return itemsByTitle;
  };

  const itemsForTitles = getItemsForTitles(
    listTitleswithNotebookId || [],
    allListItems || []
  );

  // delete list
  const handleDeleteList = async (listId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this list? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteList(listId);
      } catch (error) {
        console.error(error);
      }
      await getArrayOfListTitlesWithNotebookId();
    }
  };

  // edit list
  const handleEditList = (id) => {
    console.log(id);
    navigate(`/notebooks/${notebookId}/lists/${id}/edit`);
  };

  //in notebook page
  return (
    <div className="list">
      {itemsForTitles.map((titleObj, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredListTitleId(titleObj.title.id)}
          onMouseLeave={() => setHoveredListTitleId(null)}
        >
          <div className="list__title-wrapper">
            <h2 className="list__title">&#x1F4C3; {titleObj.title.title}</h2>

            {hoveredListTitleId === titleObj.title.id && (
              <div className="list__icon-wrapper">
                <span className="list__icons">
                  <img
                    src={editIcon}
                    alt="edit list"
                    className="list__icon"
                    onClick={() => handleEditList(titleObj.title.id)}
                  />
                  <img
                    src={deleteIcon}
                    alt="delete list"
                    className="list__icon"
                    onClick={() => handleDeleteList(titleObj.title.id)}
                  />
                </span>
              </div>
            )}
            <div className="list__icons-tablet">
              <img
                src={editIcon}
                alt="edit list"
                className="list__icon"
                onClick={() => handleEditList(titleObj.title.id)}
              />
              <img
                src={deleteIcon}
                alt="delete list"
                className="list__icon"
                onClick={() => handleDeleteList(titleObj.title.id)}
              />
            </div>
          </div>

          <ListItems
            itemsForTitles={itemsForTitles}
            getAllListItems={getAllListItems}
            listIdForTitle={titleObj.title.id}
            listId={listId}
          />
        </div>
      ))}
    </div>
  );
}
