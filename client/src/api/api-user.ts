import { ForgotPasswordData } from "../pages/ForgotPassword";
import { ChangeFormData } from "../routes/ChangeUserInfo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const editUserInfo = async (formData: ChangeFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/updateUserInfo`, {
    method: "PATCH",
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

export const forgotPassword = async (formData: ForgotPasswordData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/forgotPassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error("Problem changing password");
};
