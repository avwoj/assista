import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import "./Journal.css";
const Journal = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    let now = new Date();
    let displayTime = `
    ${now.getMonth() +
      1}-${now.getDate()}-${now.getFullYear()}   ${now.getHours()}:${now.getMinutes()} ${
      now.getHours() >= 12 ? "PM" : "AM"
    }`;
    alert(value + displayTime);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="float-right" style={{ paddingRight: "85%" }}>
            <h3>Gratitude Journal</h3>
            <input className="search" type="search" placeholder="Search" />
          </div>
          <div className="wrapper" style={{ width: "80%", float: "left" }}>
            <textarea
              style={{ width: "100%" }}
              id="textArea"
              value={value}
              class="h2"
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setValue(e.target.value);
              }}
              cols="30"
              rows="15"
              placeholder="List three things you're grateful for:"
            />
            <input className="submit" type="submit" value="Submit" />
          </div>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export default Journal;
