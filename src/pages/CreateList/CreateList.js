import "./CreateList.scss";
import AddEditListTitle from "../../components/AddEditListTitle/AddEditListTitle";
import AddEditListItems from "../../components/AddEditListItems/AddEditListItems";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { Link } from "react-router-dom";

export default function CreateList() {
  const { notebookId } = useParams();
  const [lists, setLists] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getListTitles = async () => {
    try {
      const data = await fetchListTitles();
      setLists(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListTitles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-list">
      <TopNavigation notebookId={notebookId} />
      <div className="create-list__wrapper1">
        <div className="create-list__wrapper2">
          <AddEditListTitle notebookId={notebookId} />
          <AddEditListItems lists={lists} />
        </div>
        <Link to={`/notebooks/${notebookId}`}>
          <button className="create-list__done-button">DONE</button>
        </Link>
      </div>
    </div>
  );
}
