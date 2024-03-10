import { useState } from "react";
import { Id, TaskItem } from "./Week";

import DeleteIcon from "../../icons/DeleteIcon";

interface Props {
  task: TaskItem;
  deleteTask: (_id: Id) => void;
  updateTask: (taskId: string, content: string) => void;
}

function Task({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div className=" relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md p-2.5 text-left  hover:ring-2 hover:ring-inset hover:ring-indigo-400 dark:bg-slate-700 dark:hover:ring-slate-900">
        <textarea
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task._id, e.target.value)}
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-gray-700 focus:outline-none dark:text-gray-200"
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md bg-indigo-300 p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-indigo-400 dark:bg-slate-700 dark:hover:ring-indigo-300"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap ">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task._id);
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 "
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default Task;
