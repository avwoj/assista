import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TinyCalendar from "./TinyCalendar";
// import "./journal.css";

const Journal = (props) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let now = new Date();
  let displayTime = `
    ${now.getMonth() +
      1}-${now.getDate()}-${now.getFullYear()}   ${now.getHours()}:${
    now.getMinutes() <= 9 ? 0 : ""
  }${now.getMinutes()}  ${now.getHours() >= 12 ? "PM" : "AM"}`;

  const handleSubmit = () => {
    return displayTime;
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Group>
          <Form.Group className="float-right" style={{ paddingRight: "85%" }}>
            <Form.Group className="h3">Gratitude Journal</Form.Group>
            <Form.Control
              className="search"
              type="search"
              placeholder="Search"
            />
          </Form.Group>
          <Form.Group
            className="wrapper bg-secondary"
            style={{
              width: "80%",
              float: "left",
            }}
          >
            <textarea
              style={{ width: "100%" }}
              id="textArea"
              value={value}
              className="h2"
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setValue(e.target.value);
              }}
              cols="30"
              rows="15"
              placeholder="List three things you're grateful for:"
            />
            <Button
              className="submit"
              variant="info"
              type="submit"
              onClick={handleShow}
            >
              Submit
            </Button>
          </Form.Group>
        </Form.Group>
        <TinyCalendar />
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Text>Journal Entry</Form.Text> <br />
            <Form.Text
              className="border border-warning bg-secondary"
              style={{ fontSize: "15px", color: "white" }}
            >
              {displayTime}
            </Form.Text>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border border-info">
          <Form.Group className="h5">{value}</Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Journal;
