import { Id, TaskItem } from "./Week";

import Task from "./Task";
import PlusIcon from "../../icons/PlusIcon";
import { useQueryClient } from "react-query";

type WeekProps = {
  week: number;
  day: string;
  tasks: TaskItem[];
  createTask: (week: number, day: string) => void;
  deleteTask: (_id: Id) => void;
  completeTask: (_id: Id) => void;
  updateTask: (taskId: string, content: string) => void;
  updateTaskDB: (taskId: string, content: string) => void;
};

function Day({
  week,
  day,
  tasks,
  createTask,
  deleteTask,
  completeTask,
  updateTask,
  updateTaskDB,
}: WeekProps) {
  const queryClient = useQueryClient();

  return (
    <div>
      <div className=" flex h-[500px] max-h-[500px] w-[250px] flex-col rounded-md bg-indigo-100 dark:bg-slate-600">
        <div className="flex h-[60px] items-center justify-between rounded-md rounded-b-none border-2 border-indigo-100 bg-indigo-200 p-3 text-lg font-bold dark:border-slate-600 dark:bg-slate-700">
          <span>{day}</span>
          <span className="text-sm font-normal">1 / {week}</span>
        </div>
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
              updateTask={updateTask}
              updateTaskDB={updateTaskDB}
            />
          ))}
        </div>
        <button
          onClick={() => {
            createTask(week, day);
            queryClient.invalidateQueries("progress");
          }}
          className="flex items-center border-t-2 border-indigo-200 p-4 hover:bg-indigo-200 hover:text-gray-900 active:bg-slate-600 dark:border-slate-800 dark:hover:bg-slate-700 dark:hover:text-indigo-300"
        >
          <PlusIcon />
          <span>Add task</span>
        </button>
      </div>
    </div>
  );
}

export default Day;
