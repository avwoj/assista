import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import TinyCalendar from "../tinyCalendar/TinyCalendar";
import { makeStyles } from "@material-ui/core/styles";
import { getJournal, writeJournal } from "../../actions/journal";
import "./Journal.css"

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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [theDate, setTheDate] = useState(new Date().toLocaleDateString());
  const journal = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const location = useLocation();

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

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    dispatch(getJournal(user?.result?._id));
  }, [dispatch]);

  const handleJournal = () => {
    dispatch(
      writeJournal(
        { date: theDate, text: value, author: user?.result?._id },
        user?.result?._id
      )
    );
    setValue("");
    setShow(false);
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
            rows="14"
            placeholder="List three things you're grateful for:"
          />
          <Button
            className={classes.submitBtn}
            type="submit"
            onClick={handleShow}
          >
            Submit
          </Button>
          <Button onClick={(e) => dispatch(getJournal(user?.result?._id))}>
            Reset
          </Button>

          {journal &&
            journal.map((entry, index) => {
              if (entry.date === theDate) {
                return (
                  <div className="journalEntries" key={entry.text + index}>
                    {entry.date} : {entry.text}
                  </div>
                );
              }
              return null;
            })}
        </form>
        {/* <div className={classes.calendar}> */}
        <div className="tinyCal">
          <TinyCalendar
            theDate={theDate}
            setTheDate={setTheDate}
            user={user}
            getJournal={getJournal}
          />
        </div>
        <Dialog open={show} onClose={handleClose}>
          <DialogContent>
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
          <Button onClick={handleJournal}>Save changes</Button>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Journal;
