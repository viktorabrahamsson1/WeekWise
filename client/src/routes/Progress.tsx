import ProgressCircle from "../components/progress/ProgressCircle";
import useProgress from "../hooks/useProgress";

function Progress() {
  const { allTasks, allCompletedTasks } = useProgress();

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

  const allTasksColors = ["#5f9ceb"];
  const completedTasksColors = ["#51cf66", "#868e96"];
  const inCompletedTasksColors = ["#fa5252", "#868e96"];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold ">View your progress</h3>
      <div className="flex flex-col justify-between gap-6 rounded-md bg-indigo-200 px-20 py-16 dark:bg-slate-800 xl:flex-row ">
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
      </div>
    </div>
  );
}

export default Progress;
