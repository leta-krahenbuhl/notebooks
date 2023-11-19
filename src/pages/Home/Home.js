import "./Home.scss";
import NotebooksTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

export default function Home() {
  return (
    <>
      <main className="main-home">
        <NotebooksTitles />
      </main>
      <BottomNavigation />
    </>
  );
}
