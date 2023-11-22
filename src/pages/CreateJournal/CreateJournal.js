import "./CreateJournal.scss";
import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateJournal() {
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJournal = {
      title: event.target.title.value,
      notebookId: notebookId,
    };
    // put front-end form evaluation here

    try {
      await axios.post(`${baseURL}/api/journals`, newJournal);
      event.target.reset();
      alert("Journal added successfully");
      navigate(`/notebooks/${notebookId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="create-journal">
      <TopNavigation notebookId={notebookId} />
      <h2 className="create-journal__header">NEW JOURNAL</h2>
      <form onSubmit={handleSubmit} className="add-journal-form">
        <input
          placeholder="Journal title"
          type="text"
          name="title"
          id="title"
          className="add-journal-form__input"
        />
        <button type="submit" className="add-journal-form__button">
          SAVE
        </button>
      </form>
    </main>
  );
}
