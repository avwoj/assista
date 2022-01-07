import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <h3>Navigation</h3>
      <Link to="/">Home</Link>
      {/* <Link to="/user">User Page</Link> */}
      <Link to="/calendar">Calendar</Link>
      <Link to="/journal">Journal</Link>
      <Link to="/Todo">To-Do List</Link>
    </div>
  );
}

export default Navigation;