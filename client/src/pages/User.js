import React from "react";
import Calendar from "../components/Calendar";
import "../components/calendar.css"

function User() {
  return (
    <div>
      <h3>
        This will be the user's page, routing for different components will go
        here.
      </h3>
      <Calendar />
    </div>
  );
}

export default User;
