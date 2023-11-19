import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateJournalEntry from "./pages/CreateJournalEntry/CreateJournalEntry";
import CreateNotebook from "./pages/CreateNotebook/CreateNotebook";
import Notebook from "./components/Notebook/Notebook";
import List from "./components/List/List";
import CreateList from "./pages/CreateList/CreateList";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notebooks/:notebookId" element={<Notebook />} />
          <Route
            path="/create/journal-entry"
            element={<CreateJournalEntry />}
          />
          <Route path="/create/notebook" element={<CreateNotebook />} />
          <Route path="/create/list" element={<CreateList />} />
          <Route
            path="/notebooks/:notebookId/create/list"
            element={<CreateList />}
          />
          {/* temporary route to experiment with lists: */}
          <Route path="/lists" element={<List />} />
          <Route path="/lists/edit/:listId" element={<CreateList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
