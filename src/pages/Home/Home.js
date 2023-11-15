import "./Home.scss";
import Notebooks from "../../components/Notebooks/Notebooks";

export default function Home() {
  return (
    <>
      <h1 className="home-main">This is the notebooks home page.</h1>
      <Notebooks />
    </>
  );
}
