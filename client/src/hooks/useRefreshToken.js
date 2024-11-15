import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    // console.log("Refreshing the accessToken...");
    try {
      const response = await axios.get("/api/auth/refresh", {
        withCredentials: true, //allow http only cookie to be sent with the request
      });

      setAuth((prev) => {
        // console.log("Previous accessToken:", JSON.stringify(prev.accessToken));
        // console.log("Generated accessToken:", response.data.accessToken);
        return {
          ...prev,
          roles: response.data.roles,
          accessToken: response.data.accessToken, //override the old accessToken with the newly generated accessToken
        };
      });

      return response.data.accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
