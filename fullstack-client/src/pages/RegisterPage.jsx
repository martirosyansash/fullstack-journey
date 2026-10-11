import RegisterForm from "../components/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Register</h1>
          <RegisterForm onRegisterSuccess={() => {
              navigate("/login");
      }}/>
    </div>
  );
}

export default RegisterPage;