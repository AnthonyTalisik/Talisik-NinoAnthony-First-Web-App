import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error ?? "Cannot reach the server");
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-brand">
        <span className="logo big">User<b>Hub</b></span>
        <h1>Create your account</h1>
        <p>Join UserHub to manage your profile and access your personal dashboard.</p>
      </section>
      <section className="auth-panel">
        <form onSubmit={onSubmit} className="auth-form">
          <h2>Sign up</h2>
          <label>Full name
            <input name="fullName" placeholder="Fullname" value={form.fullName} onChange={onChange} required />
          </label>
          <label>Email
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
          </label>
          <label>Password
            <input name="password" type="password" placeholder="At least 8 characters" minLength={8} value={form.password} onChange={onChange} required />
          </label>
          {error && <p className="alert alert-error">{error}</p>}
          <button className="btn btn-primary" type="submit">Register</button>
          <p className="muted center">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </section>
    </div>
  );
}