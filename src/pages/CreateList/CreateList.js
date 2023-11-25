import "./CreateList.scss";
import AddListTitle from "../../components/AddListTitle/AddListTitle";
import AddListItem from "../../components/AddListItem/AddListItem";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { Link } from "react-router-dom";

export default function CreateList() {
  const { notebookId, listId } = useParams();
  const [lists, setLists] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(notebookId); //works

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
  // console.log(lists); //works!

  return (
    <div className="create-list">
      <TopNavigation notebookId={notebookId} />
      <div className="create-list__wrapper1">
        <div className="create-list__wrapper2">
          <AddListTitle notebookId={notebookId} />
          <AddListItem lists={lists} />
        </div>
        <Link to={`/notebooks/${notebookId}`} className="cancel-button">
          <p>CANCEL</p>
        </Link>
      </div>
    </div>
  );
}
