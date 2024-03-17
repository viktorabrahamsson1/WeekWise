import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useProgress = () => {
  const [allTasks, setAllTaskss] = useState(0);
  const [allCompletedTasks, setAllCompeltedTasks] = useState(0);

  const fetchProgressData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/calenderTask/getProgress`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const body = await response.json();
      const { allTasks, completedTasks } = body;
      setAllTaskss(allTasks);
      setAllCompeltedTasks(completedTasks);
      if (!response.ok) throw new Error(body.message);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  fetchProgressData();

  return { allTasks, allCompletedTasks };
};

export default useProgress;
