import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateJournalEntry from "./components/CreateJournalEntry/CreateJournalEntry";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
