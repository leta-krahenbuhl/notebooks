import "./Habits.scss";
import circleEmpty from "../../assets/images/circle-empty.svg";
import circleFull from "../../assets/images/circle-full.svg";

import { useState } from "react";

export default function Habits({
  habitsForTrackers,
  habitIdForTracker,
  trackerId,
  getAllHabits,
}) {
  const [updatedHabits, setUpdatedHabits] = useState(habitsForTrackers);

  // Handle click on a circle
  const handleCircleClick = async (habitId, isFull) => {
    setUpdatedHabits((prevHabits) =>
      prevHabits.map((trackerObj) => ({
        ...trackerObj,
        habits: trackerObj.habits.map((habit) => {
          if (habit.id === habitId) {
            const circlesDoneUpdated = isFull
              ? habit.circles_done - 1
              : habit.circles_done + 1;
            return {
              ...habit,
              circles_done: Math.max(
                0,
                Math.min(habit.circles, circlesDoneUpdated)
              ),
            };
          }
          return habit;
        }),
      }))
    );

    getAllHabits();
  };

  return (
    <>
      <div className="habits__text">
        {updatedHabits.map((trackerObj, index) => (
          <div key={index}>
            <ul className="habits__text">
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
                    <div key={uniqueKey} className="habits__wrapper">
                      <p className="habits__item">{habit.text}</p>
                      <div className="habits__circles">
                        {/* Render full circles for circles_done */}
                        {[...Array(habit.circles_done)].map((_, index) => (
                          <img
                            key={`full-${index}`}
                            src={circleFull}
                            alt="circle full icon"
                            className="habits__circle"
                            onClick={() => handleCircleClick(habit.id, true)}
                          />
                        ))}
                        {/* Render empty circles for circles_undone */}
                        {[...Array(habit.circles - habit.circles_done)].map(
                          (_, index) => (
                            <img
                              key={`empty-${index}`}
                              src={circleEmpty}
                              alt="circle empty icon"
                              className="habits__circle"
                              onClick={() => handleCircleClick(habit.id, false)}
                            />
                          )
                        )}
                      </div>
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
