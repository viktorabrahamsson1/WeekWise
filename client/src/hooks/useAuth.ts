import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const useAuthData = () => {
  const {
    isError,
    isLoading,
    data: userInfo,
  } = useQuery({
    queryFn: apiClient.verifyToken,
    queryKey: "validateToken",
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isLoggedIn = !isError && !!userInfo?.isVerified;

  return { userInfo, isLoggedIn, isLoading };
};

export default useAuthData;
