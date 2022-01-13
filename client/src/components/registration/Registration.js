import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/user";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    window.location.reload();
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
      <Form>
        <Form.Label>Register</Form.Label>
        <Form.Control
          onChange={handleName}
          className="input"
          placeholder="Name"
          value={name}
          type="text"
        />

        <Form.Control
          onChange={handleEmail}
          className="input"
          placeholder="Email"
          value={email}
          type="email"
        />
        {/* 
        <Form.Control
          onChange={handleUsername}
          className="input"
          placeholder="User Name"
          value={username}
          type="text"
        /> */}

        <Form.Control
          onChange={handlePassword}
          className="input"
          placeholder="Password"
          value={password}
          type="password"
        />

        <Form.Control
          onChange={handleConfirmPassword}
          className="input"
          placeholder="Confirm Password"
          value={confirmPassword}
          type="password"
        />

        <Col>
          <Button
            onClick={handleSubmit}
            className="btn"
            type="submit"
            disabled={!validateForm()}
          >
            Submit
          </Button>
        </Col>
        <Col>
          <Button
            size="sm"
            onClick={() => {
              window.location.reload();
            }}
            variant="outline-primary"
          >
            Cancel
          </Button>
        </Col>
      </Form>
    </div>
  );
}
