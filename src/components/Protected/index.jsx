import { Navigate, Outlet } from "react-router-dom";
import Loader from "./../Loader";

const Protected = ({ user }) => {
  if (user === undefined) {
    return <Loader />;
  }

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={user} />;
};

export default Protected;
