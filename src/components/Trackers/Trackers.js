import { useParams } from "react-router-dom";
import "./Trackers.scss";
import ListItems from "../ListItems/ListItems";
import { fetchListItems } from "../../utils/AxiosRequests";
import { useState, useEffect } from "react";
import { fetchTrackerTitles } from "../../utils/AxiosRequests";
import { deleteTracker } from "../../utils/AxiosRequests";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";
import { useNavigate } from "react-router-dom";

export default function Trackers() {
  const [allListItems, setAllListItems] = useState(null);
  const [trackerTitleswithNotebookId, setTrackerTitleswithNotebookId] =
    useState(null);
  const [hoveredListTitleId, setHoveredListTitleId] = useState(null);

  const { notebookId, listId } = useParams();
  const navigate = useNavigate();

  // get tracker titles with notebook id
  const getArrayOfTrackerTitlesWithNotebookId = async () => {
    try {
      // get all tracker titles
      const data = await fetchTrackerTitles();
      //   console.log("data: ", data); // works

      const arrayOfListTitleswithNotebookId = data.filter(
        (notebook) => notebook.notebook_id === parseInt(notebookId)
      );

      const titlesByDate = arrayOfListTitleswithNotebookId.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTrackerTitleswithNotebookId(titlesByDate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArrayOfTrackerTitlesWithNotebookId();
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
    trackerTitleswithNotebookId || [],
    allListItems || []
  );

  // delete list
  const handleDeleteTracker = async (trackerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tracker? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteTracker(trackerId);
      } catch (error) {
        console.error(error);
      }
      await getArrayOfTrackerTitlesWithNotebookId();
    }
  };

  // edit tracker
  const handleEditTracker = (id) => {
    console.log(id);
    navigate(`/notebooks/${notebookId}/lists/${id}/edit`);
  };

  if (!trackerTitleswithNotebookId) {
    <p>Loading...</p>;
  }

  return (
    <div className="tracker">
      {trackerTitleswithNotebookId?.map((titleObj) => (
        <div key={titleObj.title} className="tracker__title-wrapper">
          <h2 className="tracker__title">{titleObj.title}</h2>
          <div className="tracker__icons-tablet">
            <img
              src={editIcon}
              alt="edit tracker"
              className="tracker__icon"
              onClick={() => handleEditTracker(titleObj.id)}
            />
            <img
              src={deleteIcon}
              alt="delete tracker"
              className="tracker__icon"
              onClick={() => handleDeleteTracker(titleObj.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
