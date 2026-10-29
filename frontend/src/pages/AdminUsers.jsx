import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { getUser } from "../api/auth";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const me = getUser();

  useEffect(() => {
    api.get("/dashboard/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.response?.status === 403) navigate("/dashboard", { replace: true });
        else setError("Could not load users.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const q = query.trim().toLowerCase();
  const shown = users.filter((u) =>
    u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>All users</h2>
          <p className="muted">{users.length} registered account{users.length === 1 ? "" : "s"}</p>
        </div>
        <input className="search" placeholder="Search name or email…"
          value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {error && <p className="alert alert-error">{error}</p>}
      {loading ? <p className="muted">Loading…</p> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Full name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {shown.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName} {u.id === me?.id && <span className="tag">You</span>}</td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.role === "ADMIN" ? "badge-admin" : "badge-user"}`}>{u.role}</span></td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan="4" className="muted center">No matching users</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}