import { Id } from "../components/KanbanBoard/KanbanBoard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCalenderTasks = async (week: number) => {
  const response = await fetch(`${API_BASE_URL}/api/calenderTask/${week}`, {
    method: "GET",
    credentials: "include",
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const createCalenderTask = async (
  content: string,
  day: string,
  week: number,
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/calenderTask/createCalenderTask`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, day, week }),
    },
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const deleteCalenderTask = async (taskId: Id) => {
  const response = await fetch(
    `${API_BASE_URL}/api/calenderTask/deleteCalenderTask`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    },
  );

  if (!response.ok) {
    throw new Error("Error creating calender task");
  }
};

export const completeCalenderTask = async (taskId: Id) => {
  const response = await fetch(
    `${API_BASE_URL}/api/calenderTask/completeCalenderTask`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    },
  );

  if (!response.ok) {
    throw new Error("Error creating calender task");
  }
};

export const updateCalenderTask = async (taskId: Id, content: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/calenderTask/updateCalenderTask`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId, content }),
    },
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const getCompletedTasks = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/calenderTask/getCompletedTasks`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};
