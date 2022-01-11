import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/user";
import {
  Grid,
  Container,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

import "./registration.css";

export default function Registration() {
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      dispatch(createUser(name, email, password));
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1 className="error">Please enter all the fields</h1>
      </div>
    );
  };

  function validateForm() {
    return (
      name.length > 0 &&
      email.length > 0 &&
      // username.length &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  }

  return (
    <div className="Registration">
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div>
        <h1>Register</h1>
        <Container className="inputs">
        <Grid
          container
          className="gridReg"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          size="small"
        >
          <TextField
            onChange={handleName}
            className="input"
            placeholder="Name"
            value={name}
            type="text"
            variant="outlined"
            size="small"
          />

          <TextField
            onChange={handleEmail}
            className="input"
            placeholder="Email"
            value={email}
            type="email"
            variant="outlined"
            size="small"
          />

          <TextField
            onChange={handlePassword}
            className="input"
            placeholder="Password"
            value={password}
            type="password"
            variant="outlined"
            size="small"
          />

          <TextField
            onChange={handleConfirmPassword}
            className="input"
            placeholder="Confirm Password"
            value={confirmPassword}
            type="password"
            variant="outlined"
            size="small"
          />
        </Grid>
        </Container>
        <Grid
          container
          className="buttons"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
          variant="outlined"
          color="primary"
            onClick={handleSubmit}
            className="button"
            type="submit"
            disabled={!validateForm()}
          >
            Submit
          </Button>
          <Button
          variant="outlined"
          color="primary"
            className="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </div>
  );
}
