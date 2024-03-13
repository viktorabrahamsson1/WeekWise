import { Id } from "../components/KanbanBoard/KanbanBoard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/task/getTasks`, {
    method: "GET",
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body;
};

export const createTask = async (columnId: Id, content: string) => {
  const response = await fetch(`${API_BASE_URL}/api/task/createTask`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ columnId, content }),
  });

  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body;
};

export const updateTask = async (taskId: Id, content: string) => {
  const response = await fetch(`${API_BASE_URL}/api/task/updateTask`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId, content }),
  });

  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body;
};

export const deleteTask = async (taskId: Id) => {
  const response = await fetch(`${API_BASE_URL}/api/task/deleteTask`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
};

export const updateTaskColumn = async (taskId: Id, columnId: Id) => {
  const response = await fetch(`${API_BASE_URL}/api/task/updateActiveColumn`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId, columnId }),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
};
