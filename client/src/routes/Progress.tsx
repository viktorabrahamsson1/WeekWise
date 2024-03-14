import ProgressCircle from "../components/progress/ProgressCircle";

function Progress() {
  const allTasks = [{ name: "allTaskss", value: 10 }];
  const completedTasks = [
    { name: "completedTasks", value: 4 },
    { name: "test", value: 6 },
  ];
  const incompletedTasks = [
    {
      name: "incompletedTasks",
      value: allTasks[0].value - completedTasks[0].value,
    },
    {
      name: "incompletedTasks2",
      value: 4,
    },
  ];

  const allTasksColors = ["#5f9ceb"];
  const completedTasksColors = ["#51cf66", "#868e96"];
  const inCompletedTasksColors = ["#fa5252", "#868e96"];

  return (
    <div className="relative flex flex-col justify-between gap-6 rounded-md bg-slate-800 px-20 py-16 xl:flex-row ">
      <ProgressCircle
        title={"All Tasks"}
        data={allTasks}
        colors={allTasksColors}
      />
      <ProgressCircle
        title={"Completed Tasks"}
        data={completedTasks}
        colors={completedTasksColors}
      />
      <ProgressCircle
        title={"Incompleted Tasks"}
        data={incompletedTasks}
        colors={inCompletedTasksColors}
      />
      <button className="absolute right-5 top-5 self-center rounded-md bg-green-700 px-2 py-1 duration-100 hover:bg-green-800 xl:right-[50%] xl:top-[19rem] xl:translate-x-[50%]">
        View completed tasks
      </button>
    </div>
  );
}

export default Progress;
