import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Calendar() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <h3>Calendar will go here</h3>
      <Button
        onClick={() => {
          setTitle("hello");
          console.log(title);
        }}
      >
        Change Title
      </Button>
    </div>
  );
}

export default Calendar;
