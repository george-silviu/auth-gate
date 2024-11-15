import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log(`Is loading... ${isLoading}`);
  //   console.log(`AccessToken... ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return <>{isLoading ? <CircularProgress /> : <Outlet />}</>;
};

export default PersistLogin;
