import "./App.scss";
// import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateNotebook from "./pages/CreateNotebook/CreateNotebook";
import Notebook from "./pages/Notebook/Notebook";
import AddEditList from "./pages/AddEditList/AddEditList";
import List from "./components/List/List";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delete" element={<Home />} />
          <Route path="/edit" element={<Home />} />

          <Route path="/notebooks/:notebookId" element={<Notebook />} />

          <Route
            path="/notebooks/:notebookId/lists/:listId"
            element={<List />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/edit"
            element={<AddEditList />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/delete"
            element={<List />}
          />

          <Route path="/create/notebook" element={<CreateNotebook />} />
          <Route
            path="/notebooks/:notebookId/create/lists/"
            element={<AddEditList />}
          />
          <Route
            path="/notebooks/:notebookId/create/journal/"
            element={<AddEditList />}
          />

          <Route
            path="/notebooks/:notebookId/create/lists/:listId"
            element={<AddEditList />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
