import "./Notebooks.scss";
import { useState, useEffect } from "react";
import { fetchNotebooks } from "../../utils/AxiosRequests";

export default function Home() {
  const [notebooks, setNotebooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNotebooks = async () => {
    try {
      const data = await fetchNotebooks();
      setNotebooks(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotebooks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {notebooks.map((notebook) => {
        return (
          // wrap h3 in a link
          <h2 className="notebook-title" key={notebook.id}>
            {notebook.title}
          </h2>
        );
      })}
    </>
  );
}
