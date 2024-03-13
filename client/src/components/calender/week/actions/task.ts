import { useState } from "react";
import * as apiClient from "../../../../api/api-calenderTask";

export type Id = string;

export type TaskItem = {
  _id: Id;
  day: string;
  content: string;
};

const useTask = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

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
  };

  const updateTaskDB = (taskId: Id, content: string) => {
    apiClient.updateCalenderTask(taskId, content);
  };

  return { createTask, deleteTask, updateTask, updateTaskDB, tasks, setTasks };
};

export default useTask;
