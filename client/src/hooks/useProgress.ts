import { useState } from "react";
import { useQuery } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useProgress = () => {
  const [allTasks, setAllTaskss] = useState(0);
  const [allCompletedTasks, setAllCompeltedTasks] = useState(0);

  const testprogress = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/calenderTask/getProgress`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const { allTasks, completedTasks } = await response.json();

      if (!response.ok) throw new Error("error");
      return { allTasks, completedTasks };
    } catch (error) {
      throw new Error("error");
    }
  };

  const { data } = useQuery({
    queryFn: async () => testprogress(),
    queryKey: "progress",
    onSuccess: () => {
      if (!data) return;
      setAllTaskss(data.allTasks);
      setAllCompeltedTasks(data.completedTasks);
    },
  });

  return { allTasks, allCompletedTasks };
};

export default useProgress;
