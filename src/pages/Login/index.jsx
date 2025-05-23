import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../../firebase";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ user }) => {
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/room" replace />;
  }

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        toast.success("Logged in successfully");
        navigate("/room");
      })
      .catch((err) => toast.error("An error occured: ", err.message));
  };

  return (
    <div className="wrapper">
      <div className="box h-[450px] flex flex-col justify-center items-center gap-[50px]">
        <h1 className="text-4xl">Chat Room</h1>

        <p className="text-gray-400">For continue please log in</p>

        <button onClick={handleLogin} className="btn flex gap-5 items-center">
          <img src="/google.png" alt="google" className="w-[30px]" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
