import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./register.styles.scss";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-form-header">Register</h1>

        <TextField
          required
          id="outlined-required"
          label="Company"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="VAT Number"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Password"
          variant="outlined"
          type="password"
        />
        <TextField
          required
          id="outlined-required"
          label="Repeat Password"
          variant="outlined"
          type="password"
        />

        <Button
          variant="contained"
          style={{
            backgroundColor: "#336699",
          }}
        >
          Register
        </Button>
      </div>

      <p>
        Already have an account account? Login{" "}
        <a href="/login">
          {" "}
          <b>here</b>.
        </a>
      </p>
    </div>
  );
};

export default Register;
