import { User } from "../routes/admin routes/Users";
import { AdminChangeFormDataExtra } from "../components/admincomponents/EditUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const adminEditUserInfo = async (formData: AdminChangeFormDataExtra) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/updateUserInfo`, {
    method: "PATCH",
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
    method: "DELETE",
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

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/getUsers`);

  const body = await response.json();

  if (!response.ok) throw new Error("Problem getting users");

  return body;
};
