import { useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import PlusIcon from "../icons/PlusIcon";
import * as apiClient from "../../api-client";

export type Id = string | number;

export type Column = {
  _id: Id;
  title: string;
};

export type Task = {
  _id: Id;
  columnId: Id;
  content: string;
};

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const queryClient = useQueryClient();

  const columnsId = useMemo(() => columns.map((col) => col._id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const { isLoading } = useQuery({
    queryFn: apiClient.getColumns,
    queryKey: "columns",
    onSuccess: (data) => {
      setColumns(data);
    },
  });

  const { isLoading: isTaskLoading } = useQuery({
    queryFn: apiClient.getTasks,
    queryKey: "tasks",
    onSuccess: (data) => {
      setTasks(data);
    },
  });

  const { mutate: createColumn } = useMutation(apiClient.createColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries("columns");
    },
    onError: () => {
      toast.error("Error creating column");
    },
  });

  const { mutate: deleteColumn } = useMutation(apiClient.deleteColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries("columns");
    },
    onError: () => {
      toast.error("Error deleting column");
    },
  });

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col._id !== id) return col;
      apiClient.updateColumn(col._id, title);
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function createTask(columnId: Id) {
    apiClient
      .createTask(columnId, `Task ${tasks.length + 1}`)
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
      });
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task._id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  const updateTaskDB = (id: Id, content: string) => {
    apiClient.updateTask(id, content);
  };

  const { mutate: deleteTASK } = useMutation(apiClient.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    onError: () => {
      toast.error("Error deleting task");
    },
  });

  function deleteTask(id: Id) {
    deleteTASK(id);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col._id === activeColumnId,
      );

      const overColumnIndex = columns.findIndex(
        (col) => col._id === overColumnId,
      );
      const list = arrayMove(columns, activeColumnIndex, overColumnIndex);
      apiClient.changePositions(list);

      return list;
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        apiClient.updateTaskColumn(
          tasks[activeIndex]._id,
          tasks[overIndex].columnId,
        );

        return arrayMove(tasks, activeIndex, overIndex);
      });

      const isOverAColumn = over.data.current?.type === "Column";

      if (isActiveATask && isOverAColumn) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t._id === activeId);

          tasks[activeIndex].columnId = overId;

          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  }

  if (isLoading || isTaskLoading) {
    return <Spinner />;
  }

  return (
    <div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden px-4 py-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4 ">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col._id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  updateTask={updateTask}
                  updateTaskDB={updateTaskDB}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col._id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createColumn(columns);
            }}
            className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-indigo-300 bg-indigo-200 p-4 ring-indigo-200 duration-100 hover:ring-2 dark:border-slate-700 dark:bg-slate-700"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                updateTaskDB={updateTaskDB}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn._id,
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                updateTaskDB={updateTaskDB}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
