import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function VerifyPassword() {
  const { passwordToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyChangePassword = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/forgotPassword/${passwordToken}`,
        );

        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.message || "failed to verify email");
        }
        toast.success("Password changed");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };

    if (passwordToken) {
      verifyChangePassword();
    }
  }, [passwordToken, navigate]);

  return <div>Verify Passowrd</div>;
}

export default VerifyPassword;
