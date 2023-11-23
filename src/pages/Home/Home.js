import "./Home.scss";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

export default function Home() {
  return (
    <>
      <main className="main-home">
        <NotebookTitles />
      </main>
      <BottomNavigation />
    </>
  );
}
