import "./Home.scss";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <article className="home">
      <Header />
      <main className="main-home">
        <NotebookTitles />
      </main>
      <BottomNavigation />
    </article>
  );
}
