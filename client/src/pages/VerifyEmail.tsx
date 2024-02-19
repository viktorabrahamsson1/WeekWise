import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/createUser/register/verify/${token}`,
          { method: "GET" },
        );

        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.message || "failed to verify email");
        }
        toast.success("Email verified");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      verifyUserEmail();
    }
  }, [token, navigate]);

  return <div>Verify</div>;
}

export default VerifyEmail;
