import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions/auth";
import {
  Grid,
  Container,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

import "./registration.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Registration() {
  // States for registration
  const [formData, setFormData] = useState(initialState);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, navigate));
    // if (name === "" || email === "" || password === "") {
    //   setError(true);
    // } else {
    //   setSubmitted(true);
    //   setError(false);
    // }
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
        <h1>User {formData.firstName} successfully registered!!</h1>
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
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.confirmPassword.length > 0
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
            spacing={2}
            className="gridReg"
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            size="small"
          >
            <TextField
              onChange={handleChange}
              className="input"
              // placeholder="First Name"
              name="firstName"
              label="First Name"
              type="text"
              variant="outlined"
              size="small"
            />

            <TextField
              onChange={handleChange}
              className="input"
              // placeholder="First Name"
              name="lastName"
              label="Last Name"
              type="text"
              variant="outlined"
              size="small"
            />

            <TextField
              onChange={handleChange}
              className="input"
              // placeholder="Email"
              // value={email}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
            />

            <TextField
              onChange={handleChange}
              className="input"
              // placeholder="Password"
              name="password"
              // value={password}
              label="Password"
              type="password"
              variant="outlined"
              size="small"
            />

            <TextField
              onChange={handleChange}
              className="input"
              // placeholder="Confirm Password"
              // value={confirmPassword}
              label="Confirm Password"
              name="confirmPassword"
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
