import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/dashboard" replace />;
  return children;
}