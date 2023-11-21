import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

const fetchNotebookTitles = async () => {
  const { data } = await axios.get(`${baseURL}/api/notebooks`);
  return data;
};

const fetchListTitles = async () => {
  const { data } = await axios.get(`${baseURL}/api/list-titles`);
  return data;
};

const fetchListItems = async () => {
  const { data } = await axios.get(`${baseURL}/api/list-items`);
  return data;
};

const editListItemDone = async (updateDoneObject) =>
  await axios.put(`${baseURL}/api/list-items/done`, updateDoneObject);

const editListItem = async (updateItemObject) =>
  await axios.put(`${baseURL}/api/list-items`, updateItemObject);

const deleteNotebook = async (id) => {
  await axios.delete(`${baseURL}/api/notebooks`, {
    data: { id: id },
  });
};

const deleteList = async (listId) => {
  await axios.delete(`${baseURL}/api/list-titles`, {
    data: { listId: listId },
  });
};

export {
  fetchNotebookTitles,
  fetchListTitles,
  fetchListItems,
  editListItemDone,
  editListItem,
  deleteNotebook,
  deleteList,
};
