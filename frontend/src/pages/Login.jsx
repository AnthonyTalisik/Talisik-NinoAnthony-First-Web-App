import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response ? "Invalid email or password" : "Cannot reach the server");
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-brand">
        <span className="logo big">User<b>Hub</b></span>
        <h1>Welcome back</h1>
        <p>Log in to see your dashboard. Administrators get additional tools to manage users.</p>
      </section>
      <section className="auth-panel">
        <form onSubmit={onSubmit} className="auth-form">
          <h2>Log in</h2>
          <label>Email
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
          </label>
          <label>Password
            <input name="password" type="password" placeholder="Your password" value={form.password} onChange={onChange} required />
          </label>
          {error && <p className="alert alert-error">{error}</p>}
          <button className="btn btn-primary" type="submit">Log in</button>
          <p className="muted center">No account yet? <Link to="/register">Register</Link></p>
        </form>
      </section>
    </div>
  );
}