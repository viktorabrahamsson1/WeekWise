import { useQuery } from "react-query";
import * as apiClient from "../api/api-auth";

const useAuthData = () => {
  const {
    // isError,
    isLoading,
    data: userInfo,
  } = useQuery({
    queryFn: apiClient.verifyAuthToken,
    queryKey: "validateToken",
    retry: false,
    refetchOnWindowFocus: false,
  });

  // const isLoggedIn = !isError && !!userInfo?.isVerified;
  const isLoggedIn = true;

  return { userInfo, isLoggedIn, isLoading };
};

export default useAuthData;
