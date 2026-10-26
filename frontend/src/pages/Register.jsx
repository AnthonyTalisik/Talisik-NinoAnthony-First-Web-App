import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch {
      setError("Registration failed. Check your details or try another email.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="card">
      <h2>Create account</h2>
      <input name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password (at least 8 characters)" value={form.password} onChange={onChange} minLength={8} required />
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </form>
  );
}
