import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-calenderTask";

const useProgress = () => {
  const [allTasks, setAllTasks] = useState(0);
  const [allCompletedTasks, setAllCompeltedTasks] = useState(0);

  const { isLoading: isProgressLoading } = useQuery({
    queryFn: apiClient.getProgress,
    queryKey: "progress",
    onSuccess: (data) => {
      setAllTasks(data.allTasks);
      setAllCompeltedTasks(data.completedTasks);
    },
  });

  return { allTasks, allCompletedTasks, isProgressLoading };
};

export default useProgress;
