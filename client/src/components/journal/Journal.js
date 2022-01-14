import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Collapse,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
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
  calendarX: {
    marginLeft: "88.5rem",
    fontFamily: "Cursive",
    width: "3%",
    marginTop: "-2.9rem",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor: "#F0F8FF",
    color: "black",
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

const Journal = (prop) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

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

  const handleRemove = (e) => {
    localStorage.removeItem("value", setValue(e.target.value));
  };
  return (
    <React.Fragment>
      <div className={classes.root}>
        <form
          action=""
          method="GET"
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2>Gratitude Journal</h2>
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
          >
            Submit
          </Button>
          <Button onClick={handleRemove}>Reset</Button>
          <div>
            <div />
            {value}
          </div>
        </form>
        <div className={classes.calendar}>
          {show2 === true ? <TinyCalendar /> : null}
        </div>
        <Dialog open={show} onClose={handleClose}>
          <DialogContent closeButton>
            <DialogTitle>Journal Entry</DialogTitle> <br />
            <DialogContentText
              className="border border-warning bg-secondary"
              style={{ fontSize: "15px", color: "white" }}
            >
              {displayTime}
            </DialogContentText>
            <DialogContentText>{value}</DialogContentText>
          </DialogContent>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save changes</Button>
        </Dialog>
        <div className={classes.calendarDiv}>
          <Button
            className={classes.calendarBtn}
            onClick={() => {
              setShow2(true);
              classes.calendarBtn["color"] = "white";
            }}
          >
            Tiny Calendar
          </Button>
          <Collapse
            in={show2}
            className={classes.calendarX}
            orientation="vertical"
          >
            <IconButton onClick={() => setShow2(false)}>
              <ClearIcon />
            </IconButton>
          </Collapse>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Journal;
