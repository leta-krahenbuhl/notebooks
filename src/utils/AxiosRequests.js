import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

const fetchNotebookTitles = async () => {
  const { data } = await axios.get(`${baseURL}/api/notebooks`);
  return data;
};

export { fetchNotebookTitles };
