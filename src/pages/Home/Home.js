import "./Home.scss";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <article className="home">
      <Header />
      <main className="main-home">
        <NotebookTitles />
        <Link to={`/readme`}>
          <p class="main-home__instructions">Read me...</p>
        </Link>
      </main>
      <BottomNavigation />
    </article>
  );
}
