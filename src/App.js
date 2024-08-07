import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateNotebook from "./pages/CreateNotebook/CreateNotebook";
import List from "./components/List/List";
import Notebook2 from "./pages/Notebook2/Notebook2";
import EditList from "./pages/EditList/EditList";
import AddList from "./pages/AddList/AddList";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delete" element={<Home />} />
          <Route path="/edit" element={<Home />} />

          <Route path="/notebooks/:notebookId" element={<Notebook2 />} />

          <Route
            path="/notebooks/:notebookId/lists/:listId"
            element={<List />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/edit"
            element={<EditList />}
          />
          <Route
            path="/notebooks/:notebookId/lists/:listId/delete"
            element={<List />}
          />

          <Route path="/create/notebook" element={<CreateNotebook />} />
          <Route
            path="/notebooks/:notebookId/create/lists/"
            element={<AddList />}
          />
          {/* <Route
            path="/notebooks/:notebookId/create/journal/"
            element={<AddEditList />}
          /> */}

          <Route
            path="/notebooks/:notebookId/create/lists/:listId"
            element={<AddList />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
