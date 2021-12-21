import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
