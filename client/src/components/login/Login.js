import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Container,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Registration from "../registration/Registration";
import "./login.css";
import { signin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState(initialState);

  const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateForm() {
    return formData.email.length > 0 && formData.password.length > 0;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signin(formData, navigate))
  }

  function handleClick() {
    setIsRegisterButtonClicked(!isRegisterButtonClicked);
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: "#0052cc",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  theme = createTheme(theme, {
    palette: {
      info: {
        main: theme.palette.secondary.main,
      },
    },
  });

  return (
    <div className="Login">
      {isRegisterButtonClicked ? (
          <Registration isRegisterButtonClicked={isRegisterButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked}/>
      ) : (
        <div className="welcome">
          <h1>Welcome</h1>
          <form onSubmit={handleSubmit}>
            <Container className="inputs">
              <Grid
                className="grid"
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  size="small"
                  variant="outlined"
                  name="email"
                  label="Email"
                  type="email"
                  onChange={handleChange}
                />

                <TextField
                  size="small"
                  variant="outlined"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
            </Container>
            <Grid
              className="buttons"
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                variant="outlined"
                color="primary"
                className="button"
                size="md"
                type="submit"
                disabled={!validateForm()}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                color="primary"
                className="button"
                size="sm"
                onClick={() => {
                  handleClick();
                }}
              >
                Register
              </Button>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
