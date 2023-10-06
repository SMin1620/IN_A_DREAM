import { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRoutePorps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRoutePorps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/Login" />;
};

export default PrivateRoute;
