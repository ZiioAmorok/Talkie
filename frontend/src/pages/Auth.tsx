import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <LoginForm switchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
