import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { HiArrowUturnLeft } from "react-icons/hi2";

import Day from "./Day";
import Spinner from "../../Spinner";
import * as apiClient from "../../../api/api-calenderTask";
import useTask from "./actions/task";

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
  const { createTask, deleteTask, setTasks, tasks, updateTask, updateTaskDB } =
    useTask();

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
    <div className="relative flex flex-wrap justify-center gap-4">
      {days.map((day) => (
        <Day
          key={day}
          week={+week}
          day={day}
          tasks={tasks.filter((task) => task.day === day)}
          createTask={createTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          updateTaskDB={updateTaskDB}
        />
      ))}
      <Link to="/calender">
        <HiArrowUturnLeft className="absolute left-[-0.5rem] top-[-3rem] size-8 cursor-pointer duration-100 hover:text-gray-800 dark:hover:text-gray-400" />
      </Link>
    </div>
  );
}

export default Week;
