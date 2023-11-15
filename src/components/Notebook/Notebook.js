import "./Notebook.scss";
import { useParams } from "react-router-dom";

export default function Notebook() {
  const { notebookId } = useParams();

  return (
    <h2 className="notebook">
      All pages from one notebook here please thank you.{" "}
    </h2>
  );
}
