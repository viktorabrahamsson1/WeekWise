import { useEffect, useState } from "react";
import ProgressCircle from "../components/progress/ProgressCircle";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Progress() {
  const [allTasks, setAllTaskss] = useState(0);
  const [allCompletedTasks, setAllCompeltedTasks] = useState(0);

  const allTasksData = [{ name: "allTaskss", value: allTasks }];
  const allCompletedTasksData = [
    { name: "completedTasks", value: allCompletedTasks },
    {
      name: "completedTasksGray",
      value: allTasks - allCompletedTasks,
    },
  ];
  const inCompletedTasks = [
    { name: "incompletedTasks", value: allTasks - allCompletedTasks },
    {
      name: "incompletedTasksGray",
      value: allCompletedTasks,
    },
  ];

  useEffect(() => {
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
  }, []);

  const allTasksColors = ["#5f9ceb"];
  const completedTasksColors = ["#51cf66", "#868e96"];
  const inCompletedTasksColors = ["#fa5252", "#868e96"];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold ">View your progress</h3>
      <div className="relative flex flex-col justify-between gap-6 rounded-md bg-slate-800 px-20 py-16 xl:flex-row ">
        <ProgressCircle
          title={"All Tasks"}
          data={allTasksData}
          colors={allTasksColors}
        />
        <ProgressCircle
          title={"Completed Tasks"}
          data={allCompletedTasksData}
          colors={completedTasksColors}
        />
        <ProgressCircle
          title={"Incompleted Tasks"}
          data={inCompletedTasks}
          colors={inCompletedTasksColors}
        />
        <button className="absolute right-5 top-5 self-center rounded-md bg-green-700 px-2 py-1 duration-100 hover:bg-green-800 xl:right-[50%] xl:top-[19rem] xl:translate-x-[50%]">
          View completed tasks
        </button>
      </div>
    </div>
  );
}

export default Progress;
