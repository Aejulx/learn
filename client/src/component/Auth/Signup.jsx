import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/actions";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <button type="submit">Signup</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
