import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TinyCalendar from "../tinyCalendar/TinyCalendar";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#F0F8FF",
    width: "100%",
  },
  textArea: {
    padding: "20px",
    margin: "15px 0",
    backgroundColor: "white",
    fontSize: "20px",
    width: "100%",
  },
  form: {
    width: "100%",
  },
  topDiv: {
    display: "flex",
    width: "100%",
    float: "right",
    backgroundColor: "#EBECF0",
  },
  textAreaDiv: {
    backgroundColor: "#EBECF0",
    width: "100%",
  },
  topHeading: {
    borderRadius: "0 5px 5px 0;",
    fontSize: "2rem",
    fontWeight: "bold",
    width: "50%",
    textAlign: "center",
    marginTop: "1%",
  },
  textInput: {
    marginRight: "60%",
    width: "50%",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "15px",
  },
  calendar: {
    marginLeft: "71rem",
    marginTop: "-7.2rem",
  },
  calendarBtn: {
    marginLeft: "77.3rem",
    fontFamily: "Cursive",
    fontSize: "17px",
    fontWeight: "bold",
    borderRadius: "20px 0 20px 5px",
    backgroundColor: "#F0F8FF",
    color: "black",
    border: "1px solid #EBECF0",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
      borderLeft: "1px solid #f97909",
      borderTop: "1px solid #5fc4bf",
      borderRight: "1px solid #804e8f",
      borderBottom: "1px solid #f97909",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  calendarDiv: {
    marginLeft: "2rem",
    marginTop: "3.3rem",
  },
  submitBtn: {
    fontSize: "20px",
    marginTop: "-5px",
    marginBottom: "3px",
    marginLeft: "5px",
    fontWeight: "bold",
    borderBottom: "3px solid #5f7676",
    backgroundColor: "#F0F8FF",
    color: "black",
    "&:hover": {
      borderRadius: "20px 0 20px 0",
      backgroundColor: "#fff",
      color: "#3c52b2",
      borderLeft: "1px solid #f97909",
      borderTop: "1px solid #5fc4bf",
      borderRight: "1px solid #804e8f",
      borderBottom: "1px solid #f97909",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));

const Journal = (props) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [toggle, setToggle] = useState(false);

  const triggerToggle = () => {
    setToggle(!toggle);
  };

  const classes = useStyle();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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
      <div className={classes.root}>
        <Form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group>
            <Form.Group className={classes.topDiv}>
              <Form.Group className={classes.topHeading}>
                Gratitude Journal
              </Form.Group>
              <Form.Control
                className={classes.textInput}
                type="search"
                placeholder="Search"
              />
            </Form.Group>
            <Form.Group className={classes.textAreaDiv}>
              <textarea
                value={value}
                className={classes.textArea}
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
                className={classes.submitBtn}
                type="submit"
                onClick={handleShow}
                variant="none"
              >
                Submit
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
        <div className={classes.calendar}>
          {show2 == true ? <TinyCalendar /> : null}
        </div>
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
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className={classes.calendarDiv}>
          <Button
            variant="none"
            className={classes.calendarBtn}
            onClick={() => {
              setShow2(true);
              classes.calendarBtn["color"] = "white";
            }}
          >
            Tiny Calendar
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Journal;
