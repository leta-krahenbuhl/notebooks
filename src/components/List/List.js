import { Link, useParams } from "react-router-dom";
import "./List.scss";
import ListItems from "../ListItems/ListItems";
import { fetchListItems } from "../../utils/AxiosRequests";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import Header from "../../components/Header/Header";

export default function List() {
  const [allListItems, setAllListItems] = useState(null);
  const [listTitleswithNotebookId, setListTitleswithNotebookId] =
    useState(null);

  const { notebookId, listId } = useParams();

  useEffect(() => {
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

    getArrayOfListTitlesWithNotebookId();
  }, [notebookId]);

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

  //in notebook page
  if (!listId) {
    return (
      <>
        <div className="list">
          {itemsForTitles.map((titleObj, index) => (
            <div key={index}>
              <Link to={`/notebooks/${notebookId}/lists/${titleObj.title.id}`}>
                <h2 className="list__title">
                  &#x1F4C3; {titleObj.title.title}
                </h2>
              </Link>
              <ListItems
                itemsForTitles={itemsForTitles}
                getAllListItems={getAllListItems}
                listIdForTitle={titleObj.title.id}
                listId={listId}
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (listId) {
    return (
      <>
        <div className="desktop-wrapper">
          <div className="nav-desktop-wrapper">
            <Header />
            <TopNavigation notebookId={notebookId} />
            <div className="bottom-navigation-desktop">
              <BottomNavigation />
            </div>
          </div>

          <div className="list">
            <ListItems
              itemsForTitles={itemsForTitles}
              getAllListItems={getAllListItems}
              listId={listId}
            />
          </div>
        </div>
        <div className="bottom-navigation-mobile">
          <BottomNavigation />
        </div>
      </>
    );
  }
}
