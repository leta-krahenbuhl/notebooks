import "./NotebookTitles.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNotebookTitles } from "../../utils/AxiosRequests";

export default function Home() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNotebookTitles = async () => {
    try {
      const data = await fetchNotebookTitles();
      setNotebooks(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotebookTitles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {notebooks.map((notebook) => {
        return (
          // wrap h3 in a link
          <Link to={`/${notebook.id}`} key={notebook.id}>
            <h2 className="notebook-title">{notebook.title}</h2>
          </Link>
        );
      })}
    </>
  );
}
