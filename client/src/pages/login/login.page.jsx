import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { ToastContainer, toast } from "react-toastify";

import { LoginContainer, LoginForm, LoginFormHeader } from "./login.styles";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }),
        {
          pending: "Logging in...",
          success: "Login succeded!",
          error: "Login failed!",
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });

      // console.log("User logged in.. ", {
      //   username,
      //   password,
      //   roles,
      //   accessToken,
      // });

      setUsername("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Oouups! No server response");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login failed!");
      }
    }
  };

  return (
    <LoginContainer>
      <ToastContainer theme="dark" />

      <LoginForm>
        <img
          src="/partners-portal_logo.png"
          alt="logo"
          style={{ borderRadius: "15px" }}
        />
        <div>
          <LoginFormHeader>Nice to see you again!</LoginFormHeader>
          <p>Insert your credentials to jump back in. </p>
        </div>

        <section>
          <strong>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </strong>
        </section>

        <TextField
          id="outlined-required"
          variant="outlined"
          label="Username"
          autoComplete="off"
          required
          onChange={handleUsernameChange}
          value={username}
          // error
        />

        <FormControl
          id="outlined-required"
          required
          variant="outlined"
          type="password"
          sx={{ m: 1, width: "25ch" }}
          // error
        >
          <InputLabel htmlFor="password">Password</InputLabel>

          <OutlinedInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handlePasswordChange}
            value={password}
          />
        </FormControl>

        <Button
          variant="contained"
          style={{
            backgroundColor: "#6246ea",
            color: "#fffffe",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </LoginForm>
      <p>
        Need an account? Apply for registration{" "}
        <a href="/register">
          {" "}
          <b>here</b>.
        </a>
      </p>
    </LoginContainer>
  );
};

export default Login;
