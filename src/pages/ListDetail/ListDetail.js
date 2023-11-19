import "./ListDetail.scss";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import ListItems from "../../components/ListItems/ListItems";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

export default function Home() {
  return (
    <>
      <TopNavigation />
      <main className="main-list-detail">
        <ListItems />
      </main>
      <BottomNavigation />
    </>
  );
}
