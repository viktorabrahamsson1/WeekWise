import { Navigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <div className="container mx-auto max-w-[70rem] ">{children}</div>;
}

export default ProtectedRoute;
