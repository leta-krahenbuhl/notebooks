import "./Habits.scss";
import { editListItemDone } from "../../utils/AxiosRequests";
import iconSquareDone from "../../assets/images/square-done.svg";
import iconSquareEmpty from "../../assets/images/square-empty.svg";

export default function Habits() {
  return (
    <>
      <div className="tracker-items__text">
        <div className="tracker-items">here go the tracker items</div>
        <div className="tracker-items">here go the tracker items</div>
        <div className="tracker-items">here go the tracker items</div>
      </div>
      <div className="border"></div>
    </>
  );
}
