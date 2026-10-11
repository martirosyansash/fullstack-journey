import { useState } from "react";
import { registerUser } from "../api/authApi.js";

function RegisterForm({ onRegisterSuccess}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
        await registerUser(name, email, password);
        onRegisterSuccess();
        setSuccess("Account created successfully");

        setName("");
        setEmail("");
        setPassword("");
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}

export default RegisterForm;