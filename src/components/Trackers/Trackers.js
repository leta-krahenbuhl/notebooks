import { useParams } from "react-router-dom";
import "./Trackers.scss";
import { fetchHabits } from "../../utils/AxiosRequests";
import { useState, useEffect } from "react";
import { fetchTrackerTitles } from "../../utils/AxiosRequests";
import { deleteTracker } from "../../utils/AxiosRequests";
import editIcon from "../../assets/images/icon-edit-grey.svg";
import deleteIcon from "../../assets/images/icon-trash-grey.svg";
import { useNavigate } from "react-router-dom";
import Habits from "../Habits/Habits";

export default function Trackers() {
  const [allHabits, setAllHabits] = useState(null);
  const [trackerTitleswithNotebookId, setTrackerTitleswithNotebookId] =
    useState(null);
  //   const [hoveredListTitleId, setHoveredListTitleId] = useState(null);

  const { notebookId } = useParams();
  const navigate = useNavigate();

  // get tracker titles with notebook id
  const getArrayOfTrackerTitlesWithNotebookId = async () => {
    try {
      // get all tracker titles
      const data = await fetchTrackerTitles();

      const arrayOfTrackersWithNotebookId = data.filter(
        (notebook) => notebook.notebook_id === parseInt(notebookId)
      );

      //   console.log(
      //     "arrayOfTrackersWithNotebookId: ",
      //     arrayOfTrackersWithNotebookId
      //   ); // works

      const titlesByDate = arrayOfTrackersWithNotebookId.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTrackerTitleswithNotebookId(titlesByDate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArrayOfTrackerTitlesWithNotebookId();
    // eslint-disable-next-line
  }, [notebookId]);

  // get all habits
  const getAllHabits = async () => {
    try {
      const data = await fetchHabits();
      setAllHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllHabits();
  }, []);

  //only gets habits for trackers that are in this notebook
  const getHabitsForTrackers = (trackers, habits) => {
    // console.log("trackers: ", trackers);
    // console.log("habits: ", habits);
    const habitsByTracker = trackers.map((tracker) => {
      const habitsForATracker = habits.filter(
        (habit) => habit.tracker_id === tracker.id
      );

      //   console.log("habitsForATracker: ", habitsForATracker); // works
      return { tracker, habits: habitsForATracker };
    });
    // console.log("habitsByTracker: ", habitsByTracker); // no habits...
    return habitsByTracker;
  };

  const habitsForTrackers = getHabitsForTrackers(
    trackerTitleswithNotebookId || [],
    allHabits || []
  );

  // delete list
  const handleDeleteTracker = async (trackerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tracker? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteTracker(trackerId);
      } catch (error) {
        console.error(error);
      }
      await getArrayOfTrackerTitlesWithNotebookId();
    }
  };

  // edit tracker
  const handleEditTracker = (id) => {
    navigate(`/notebooks/${notebookId}/habit-trackers/${id}/edit`);
  };

  if (!trackerTitleswithNotebookId) {
    <p>Loading...</p>;
  }

  return (
    <div className="tracker">
      {trackerTitleswithNotebookId?.map((trackerObj) => (
        <div key={trackerObj.title}>
          <div className="tracker__title-wrapper">
            <h2 className="tracker__title">&#x1F4C4; {trackerObj.title}</h2>
            <div className="tracker__icons">
              <img
                src={editIcon}
                alt="edit tracker"
                className="tracker__icon"
                onClick={() => handleEditTracker(trackerObj.id)}
              />
              <img
                src={deleteIcon}
                alt="delete tracker"
                className="tracker__icon"
                onClick={() => handleDeleteTracker(trackerObj.id)}
              />
            </div>
          </div>

          <Habits
            habitsForTrackers={habitsForTrackers}
            habitIdForTracker={trackerObj.id}
            trackerId={trackerObj.id}
            getAllHabits={getAllHabits}
          />
        </div>
      ))}
    </div>
  );
}
