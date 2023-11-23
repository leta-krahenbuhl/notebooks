import "./CreateList.scss";
import AddListTitle from "../../components/AddListTitle/AddListTitle";
import AddListItem from "../../components/AddListItem/AddListItem";
import { useState, useEffect } from "react";
import { fetchListTitles } from "../../utils/AxiosRequests";
import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

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
      <AddListTitle notebookId={notebookId} />
      <AddListItem lists={lists} />
    </div>
  );
}
