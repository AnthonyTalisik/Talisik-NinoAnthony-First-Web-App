import api from "./client";

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export async function logout() {
  try {
    await api.post("/auth/logout"); // invalidate the token on the server
  } catch {
    /* token may already be invalid; still clear locally */
  } finally {
    localStorage.clear();
  }
}