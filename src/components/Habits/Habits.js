import "./Habits.scss";
import { editListItemDone } from "../../utils/AxiosRequests";
import iconSquareDone from "../../assets/images/square-done.svg";
import iconSquareEmpty from "../../assets/images/square-empty.svg";

export default function Habits({
  habitsForTrackers,
  getAllHabits,
  habitIdForTracker,
  trackerId,
}) {
  return (
    <>
      <div className="tracker-items__text">
        {habitsForTrackers.map((trackerObj, index) => (
          <div key={index}>
            <ul className="list-items__text">
              {trackerObj.habits
                .filter((habit) => {
                  return (
                    habit.tracker_id ===
                    parseInt(trackerId ? trackerId : habitIdForTracker)
                  );
                })
                .map((habit, habitIndex) => {
                  const uniqueKey = `${index}-${habitIndex}`;
                  return (
                    <div key={uniqueKey} className="list-items__wrapper">
                      <li className="list-items__item">{habit.text}</li>
                    </div>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border"></div>
    </>
  );
}
