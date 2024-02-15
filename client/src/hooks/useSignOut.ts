import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import * as apiClient from "../api-client";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      toast.success("Logged out");
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },
    onError: () => {
      toast.error("Problem signing out");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return { handleClick };
};
