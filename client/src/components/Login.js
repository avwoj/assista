import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Registration from "../components/Registration"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./login.css";
import TinyCalendar from "./TinyCalendar";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClick() {
    setIsRegisterButtonClicked(true)
  }


  return (
    <div className="Login">
      {isRegisterButtonClicked ? 
      <Registration />
        :
        <div>
        <Form.Label>Welcome</Form.Label>
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Control
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
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
        <Button className="login_button" size="md" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      <Button className="register_button" size="sm" variant="outline-primary" onClick={() => {handleClick()}}>Register</Button>
      </div>
      }
      </div>
  );
}



export default Login;