import { useState } from "react";

import Day from "./Day";
import * as apiClient from "../../../api-client";
import { useQuery } from "react-query";
import Spinner from "../../Spinner";
import { useParams } from "react-router";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

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
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const { week } = useParams();

  const { isLoading } = useQuery({
    queryFn: async () =>
      apiClient.getCalenderTasks(Number(week)).then((data) => setTasks(data)),
    queryKey: "calenderTasks",
  });

  const createTask = (week: number, day: string) => {
    apiClient
      .createCalenderTask(`Task ${tasks.length + 1}`, day, week)
      .then((data) => setTasks((tasks) => [...tasks, data]));
  };

  const deleteTask = (taskId: Id) => {
    apiClient.deleteCalenderTask(taskId);
    setTasks((tasks) => tasks.filter((task) => task._id !== taskId));
  };

  const updateTask = (taskId: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task._id !== taskId) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
    apiClient.updateCalenderTask(taskId, content);
  };

  if (isLoading || !week) {
    return (
      <div className="flex h-[35rem] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap gap-4">
      {days.map((day) => (
        <Day
          key={day}
          week={+week}
          day={day}
          tasks={tasks.filter((task) => task.day === day)}
          createTask={createTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
      <Link to="/calender">
        <HiArrowUturnLeft className="absolute left-[-3rem] top-2 size-8 cursor-pointer duration-100 hover:text-gray-800 dark:hover:text-gray-400" />
      </Link>
    </div>
  );
}

export default Week;
