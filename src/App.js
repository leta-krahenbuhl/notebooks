import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateJournalEntry from "./pages/CreateJournalEntry/CreateJournalEntry";
import CreateNotebook from "./pages/CreateNotebook/CreateNotebook";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create/journal-entry"
            element={<CreateJournalEntry />}
          />
          <Route path="/create/notebook" element={<CreateNotebook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
