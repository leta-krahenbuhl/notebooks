import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Main />} />
          <Route path="/videos/:videoId" element={<Main />} />
          <Route path="upload" element={<UploadPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
