import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const useContextData = () => {
  const { isError, data: userInfo } = useQuery(
    "validateToken",
    apiClient.verifyToken,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  return { isError, userInfo };
};

export default useContextData;
