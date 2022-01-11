import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button, makeStyles } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import Registration from "../registration/Registration";
import "./login.css";
import TinyCalendar from "../tinyCalendar/TinyCalendar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClick() {
    setIsRegisterButtonClicked(!isRegisterButtonClicked);
  }



  let theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#edf2ff',
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
        <Container>
          <Registration />
        </Container>
      ) : (
        <div className="welcome">
          <h1>Welcome</h1>
          <form
          onSubmit={handleSubmit}>
            <Container className="inputs">
            <Grid
            className= "grid"
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <TextField
              size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            </Container>
            <Grid className= "buttons"
              direction="column"
              justifyContent="flex-start"
              alignItems="center">
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
