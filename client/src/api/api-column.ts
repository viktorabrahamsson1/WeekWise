import { Column, Id } from "../components/KanbanBoard/KanbanBoard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getColumns = async () => {
  const response = await fetch(`${API_BASE_URL}/api/column/getColumns`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error getting columns");

  const columns = await response.json();
  return columns;
};

export const createColumn = async (columns: Column[]) => {
  const response = await fetch(`${API_BASE_URL}/api/column/createColumn`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ columns }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error("Error creating column");

  return body;
};

export const deleteColumn = async (columnId: string | number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/column/deleteColumn/${columnId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) throw new Error("Error deleting column");
};

export const updateColumn = async (columnId: Id, title: string) => {
  const response = await fetch(`${API_BASE_URL}/api/column/updateColumn`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ columnId, title }),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
  const updatedColumn = await response.json();
  return updatedColumn;
};

export const changePositions = async (orderdColumns: Column[]) => {
  const response = await fetch(`${API_BASE_URL}/api/column/position`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderdColumns),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
};
