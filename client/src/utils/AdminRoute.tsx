import { Navigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";

type AdminRouteProps = {
  children: React.ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  const { isLoggedIn, userInfo } = useAppContext();

  if (!isLoggedIn && userInfo.userRole !== "superAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
