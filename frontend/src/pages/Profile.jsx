import { useEffect, useState } from "react";
import api from "../api/client";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setFullName(res.data.fullName);
      setEmail(res.data.email);
      setRole(res.data.role);
    }).catch(() => setError("Could not load your profile."));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      const { data } = await api.put("/users/me", { fullName });
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userchange")); // refresh the navbar
      setFullName(data.fullName);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.error ?? "Update failed");
    }
  };

  return (
    <section className="panel narrow">
      <h2>My profile</h2>
      <p className="muted">You can change your full name. Email and role are fixed.</p>
      <form onSubmit={onSubmit} className="form">
        <label>Full name
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} disabled />
        </label>
        <label>Role
          <input value={role} disabled />
        </label>
        {message && <p className="alert alert-ok">{message}</p>}
        {error && <p className="alert alert-error">{error}</p>}
        <button className="btn btn-primary" type="submit">Save changes</button>
      </form>
    </section>
  );
}