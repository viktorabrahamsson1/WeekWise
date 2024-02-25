import { RegisterFormData } from "./pages/Register";
import { ChangeFormData } from "./routes/ChangeUserInfo";
import { SignInFormData } from "./pages/Login";
import { AdminChangeFormDataExtra } from "./components/admincomponents/EditUser";
import { User } from "./routes/admin routes/Users";
import { ForgotPasswordData } from "./pages/ForgotPassword";
import { Id } from "./components/KanbanBoard/KanbanBoard";
import { Column } from "./components/KanbanBoard/KanbanBoard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/createUser/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Problem signing out");
  }
};

export const editUserInfo = async (formData: ChangeFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/updateUserInfo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error("Problem chaning userInfo");
  }

  return body;
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/getUsers`);

  const body = await response.json();

  if (!response.ok) throw new Error("Problem getting users");

  return body;
};

export const forgotPassword = async (formData: ForgotPasswordData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error("Problem changing password");
};

export const adminEditUserInfo = async (formData: AdminChangeFormDataExtra) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/updateUserInfo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw new Error("Problem changing user info");

  return body;
};

export const adminDeleteUser = async (user: User) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/deleteUser`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Problem deleting user");
};

export const adminGetUsersToday = async (date: string): Promise<User[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/getUserToday/${date}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const body = await response.json();

  if (!response.ok) throw new Error("Problem getting users");

  return body;
};

export const verifyAuthToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error("invalide Token");
  }

  return body;
};

export const getColumns = async () => {
  const response = await fetch(`${API_BASE_URL}/api/column/getColumns`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error getting columns");

  const columns = await response.json();

  return columns;
};

type Title = {
  title: string;
};

export const createColumn = async (title: Title) => {
  const response = await fetch(`${API_BASE_URL}/api/column/createColumn`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(title),
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
    method: "POST",
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

export const changePositions = async (columns: Column[]) => {
  const response = await fetch(
    `${API_BASE_URL}/api/column/changeColumnPositions`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(columns),
    },
  );

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
};
