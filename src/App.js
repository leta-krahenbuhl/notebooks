import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateJournalEntry from "./pages/CreateJournalEntry/CreateJournalEntry";
import CreateNotebook from "./pages/CreateNotebook/CreateNotebook";
import Notebook from "./pages/Notebook/notebook";
import List from "./components/List/List";
import CreateList from "./pages/CreateList/CreateList";
import ListDetail from "./pages/ListDetail/ListDetail";
import EditList from "./pages/EditList/EditList";
import CreatePost from "./pages/CreatePost/CreatePost";
import CreateJournal from "./pages/CreateJournal/CreateJournal";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delete" element={<Home />} />
          <Route path="/edit" element={<Home />} />

          <Route path="/notebooks/:notebookId" element={<Notebook />} />
          <Route
            path="/notebooks/:notebookId/create-post"
            element={<CreatePost />}
          />

          <Route
            path="/notebooks/:notebookId/lists/:listId"
            element={<ListDetail />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/edit"
            element={<EditList />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/delete"
            element={<ListDetail />}
          />

          <Route path="/create/notebook" element={<CreateNotebook />} />
          <Route
            path="/notebooks/:notebookId/create-post/list/"
            element={<CreateList />}
          />

          <Route
            path="/notebooks/:notebookId/create/list/:listId"
            element={<CreateList />}
          />

          {/* temporary route to experiment with lists: */}
          <Route path="/lists" element={<List />} />
          <Route path="/lists/add/:listId" element={<CreateList />} />

          <Route
            path="/notebooks/:notebookId/create/journal/"
            element={<CreateJournal />}
          />

          <Route
            path="/create/journal-entry"
            element={<CreateJournalEntry />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
