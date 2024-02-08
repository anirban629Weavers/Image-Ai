import api from ".";
import { LOGIN_URL } from "../constants";

export const getSuperAdmin = async () => {
  const admin: { has_user: boolean } = await api.GET("/get-superuser");
  return admin.has_user;
};

export const loginUser = async (body: { email: string; password: string }) => {
  try {
    const response = await api.POST(LOGIN_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
