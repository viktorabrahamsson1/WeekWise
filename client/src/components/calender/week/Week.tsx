import { useState } from "react";

import Day from "./Day";
import * as apiClient from "../../../api-client";
import { useQuery } from "react-query";
import Spinner from "../../Spinner";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type Id = string | number;

export type TaskItem = {
  _id: Id;
  day: string;
  content: string;
};

function Week() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const { isLoading } = useQuery({
    queryFn: async () => apiClient.getCalenderTasks(2),
    queryKey: "calenderTasks",
  });

  const createTask = (week: number, content: string, day: string) => {
    const newTask = {
      content,
      week,
      day,
      _id: createId(),
    };
    apiClient.createCalenderTask(content, day, week);
    setTasks((tasks) => [...tasks, newTask]);
  };

  const deleteTask = (_id: Id) => {
    apiClient.deleteCalenderTask(_id);
    setTasks((tasks) => tasks.filter((task) => task._id !== _id));
  };

  const createId = () => {
    return Math.trunc(Math.random() * 10001);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {days.map((day) => (
        <Day
          key={day}
          day={day}
          tasks={tasks.filter((task) => task.day === day)}
          createTask={createTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default Week;
