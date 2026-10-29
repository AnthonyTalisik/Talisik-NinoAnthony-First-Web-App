import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logout } from "../api/auth";

export default function Navbar() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener("userchange", sync);
    return () => window.removeEventListener("userchange", sync);
  }, []);

  const onLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const isAdmin = user?.role === "ADMIN";
  const initials = (user?.fullName || "?")
    .split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="nav">
      <div className="nav-left">
        <span className="logo">User<b>Hub</b></span>
        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          {isAdmin && <NavLink to="/admin/users">Users</NavLink>}
          <NavLink to="/profile">My Profile</NavLink>
        </nav>
      </div>
      <div className="nav-right">
        <div className="avatar">{initials}</div>
        <div className="nav-user">
          <span>{user?.fullName}</span>
          <span className={`badge ${isAdmin ? "badge-admin" : "badge-user"}`}>{user?.role}</span>
        </div>
        <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}