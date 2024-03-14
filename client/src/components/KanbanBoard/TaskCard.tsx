import { useState } from "react";
import { Id, Task } from "./KanbanBoard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DeleteIcon from "../icons/DeleteIcon";
import CheckIcon from "../icons/CheckIcon";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  updateTaskDB: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask, updateTaskDB }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md border-2 border-indigo-300 bg-indigo-200 p-2.5 text-left opacity-50 dark:bg-slate-700 "
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className=" relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-md p-2.5 text-left  hover:ring-2 hover:ring-inset hover:ring-indigo-400 dark:bg-slate-700 dark:hover:ring-slate-900"
      >
        <textarea
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={() => {
            toggleEditMode();
            updateTaskDB(task._id, task.content);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
              updateTaskDB(task._id, task.content);
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <button>
            <CheckIcon />
          </button>
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
