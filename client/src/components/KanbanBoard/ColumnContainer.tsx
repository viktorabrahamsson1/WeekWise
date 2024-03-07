import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./KanbanBoard";
import { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

import DeleteIcon from "../icons/DeleteIcon";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (columnId: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => tasks.map((task) => task._id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-indigo-300 bg-indigo-100 opacity-40 dark:bg-slate-600 "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-indigo-100 dark:bg-slate-600"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-2 border-indigo-100 bg-indigo-200 p-3 text-lg font-bold dark:border-slate-600 dark:bg-slate-700"
      >
        <div className="flex gap-2 ">
          {editMode ? (
            <input
              value={column.title}
              onChange={(e) => updateColumn(column._id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              className="rounded border  px-2 outline-none  dark:bg-slate-800 dark:focus:border-slate-900"
            />
          ) : (
            column.title
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column._id);
          }}
          className="rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => {
          createTask(column._id);
        }}
        className="flex items-center border-t-2 border-indigo-200 p-4 hover:bg-indigo-200  hover:text-gray-900 active:bg-slate-600 dark:border-slate-800 dark:hover:bg-slate-700 dark:hover:text-indigo-300"
      >
        <PlusIcon />
        <span>Add task</span>
      </button>
    </div>
  );
}

export default ColumnContainer;
