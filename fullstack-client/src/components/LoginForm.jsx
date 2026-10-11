import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";


function LoginForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        try {
            const data = await loginUser(email, password);
            login(data);
            navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="login"
          onChange={(evt) => setEmail(evt.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(evt) => setPassword(evt.target.value)}
        />

        <button>Login</button>
          </form>
        {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;