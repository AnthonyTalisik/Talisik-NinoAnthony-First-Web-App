import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

function Stat({ label, value, tone = "" }) {
  return (
    <div className={`stat ${tone}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const [info, setInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard")
      .then(async (res) => {
        setInfo(res.data);
        if (res.data.role === "ADMIN") {
          const list = await api.get("/dashboard/users");
          setUsers(list.data);
        }
      })
      .catch(() => setError("Could not load the dashboard."));
  }, []);

  if (error) return <p className="alert alert-error">{error}</p>;
  if (!info) return <p className="muted">Loading…</p>;

  if (info.role === "ADMIN") {
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const recent = [...users].sort((a, b) => b.id - a.id).slice(0, 5);
    return (
      <>
        <section className="hero hero-admin">
          <p className="eyebrow">Administrator Console</p>
          <h1>Welcome, {info.fullName}</h1>
          <p>You can view and monitor every registered account.</p>
          <Link className="btn btn-light" to="/admin/users">Manage users</Link>
        </section>
        <div className="stats">
          <Stat label="Total users" value={info.totalUsers} tone="teal" />
          <Stat label="Administrators" value={admins} tone="purple" />
          <Stat label="Regular users" value={users.length - admins} tone="green" />
        </div>
        <section className="panel">
          <h3>Recent registrations</h3>
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              {recent.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td><td>{u.fullName}</td><td>{u.email}</td>
                  <td><span className={`badge ${u.role === "ADMIN" ? "badge-admin" : "badge-user"}`}>{u.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Member Dashboard</p>
        <h1>Welcome, {info.fullName}!</h1>
        <p>{info.email}</p>
        <Link className="btn btn-light" to="/profile">Edit my profile</Link>
      </section>
      <div className="stats">
        <Stat label="Your role" value={info.role} tone="teal" />
        <Stat label="Member since" value={info.memberSince} tone="green" />
        <Stat label="Community size" value={`${info.totalUsers} users`} tone="amber" />
      </div>
    </>
  );
}