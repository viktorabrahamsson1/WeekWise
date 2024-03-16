import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { HiArrowUturnLeft } from "react-icons/hi2";

import Day from "./Day";
import Spinner from "../../Spinner";
import useTask from "./actions/task";
import * as apiClient from "../../../api/api-calenderTask";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type Id = string;

export type TaskItem = {
  _id: Id;
  day: string;
  content: string;
};

function Week() {
  const { week } = useParams();
  const {
    createTask,
    deleteTask,
    completeTask,
    setTasks,
    tasks,
    updateTask,
    updateTaskDB,
  } = useTask();

  const { isLoading } = useQuery({
    queryFn: async () =>
      apiClient.getCalenderTasks(Number(week)).then((data) => setTasks(data)),
    queryKey: "calenderTasks",
  });

  if (isLoading || !week) {
    return (
      <div className="flex h-[35rem] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col  gap-6">
      <div className="flex items-center gap-4 ">
        <Link to="/calender">
          <HiArrowUturnLeft className=" size-8 cursor-pointer duration-100 hover:text-gray-800 dark:hover:text-gray-400" />
        </Link>
        <h2 className="text-2xl font-semibold">Week: {week}</h2>
      </div>
      <div className="relative flex flex-wrap justify-center gap-4">
        {days.map((day) => (
          <Day
            key={day}
            week={+week}
            day={day}
            tasks={tasks.filter((task) => task.day === day)}
            createTask={createTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
            updateTask={updateTask}
            updateTaskDB={updateTaskDB}
          />
        ))}
      </div>
    </div>
  );
}

export default Week;
