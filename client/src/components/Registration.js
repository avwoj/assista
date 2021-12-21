import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./registration.css"
  
export default function Registration() {
  
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
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
  
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
  
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
  
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  
  return (
    <div className="Registration">
  
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
  
      <Form>
        <Form.Label>Register</Form.Label>
        {/* Labels and inputs for form data */}
        <Form.Control onChange={handleName} className="input" placeholder="Name" 
          value={name} type="text" />
  
        <Form.Control onChange={handleEmail} className="input" placeholder="Email"
          value={email} type="email" />
  
        <Form.Control onChange={handlePassword} className="input" placeholder="Password"
          value={password} type="password" />
  
        <Button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}