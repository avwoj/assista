import React from "react";
import Calendar from "../components/calendar/Calendar";
import "../components/calendar/calendar.css";

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
