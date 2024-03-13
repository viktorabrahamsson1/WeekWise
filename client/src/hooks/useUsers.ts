import { useQuery } from "react-query";
import * as apiClient from "../api/api-admin";

const useUsers = () => {
  return useQuery({ queryKey: "users", queryFn: apiClient.getUsers });
};

export default useUsers;
