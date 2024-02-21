import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const useUsers = () => {
  return useQuery({ queryKey: "users", queryFn: apiClient.getUsers });
};

export default useUsers;
