import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Container } from "react-bootstrap";
import Registration from "../registration/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
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

  return (
    <div className="Login">
      {isRegisterButtonClicked ? (
        <Container>
          <Registration />
          {/* <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Loading...
          </Button> */}
        </Container>
      ) : (
        <div className="welcome">
          <h1>Welcome</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Control
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="login_button"
              size="md"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
          <Button
            className="register_button"
            size="sm"
            variant="outline-primary"
            onClick={() => {
              handleClick();
            }}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
