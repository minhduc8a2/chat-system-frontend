// PrivateRoute.jsx
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext, AuthContextType } from "./AuthProvider";

export default function PrivateRoute({ children }:{children:ReactNode}) {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
