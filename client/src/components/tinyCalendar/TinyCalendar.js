import React, { useState, useEffect } from "react";
import DatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./tinyCalendar.css";
import { useDispatch } from "react-redux";

function TinyCalendar({theDate, setTheDate, user,  getJournal}) {
  const [value, setDate] = useState("")
  const dispatch = useDispatch()
  
  const handleChange = (date) => {
    setDate(date)
    setTheDate(date.toLocaleDateString())

    dispatch(
      getJournal(user?.result?._id, date.toLocaleDateString())
    )
  }

  return (
    <div className="tiny">
      <DatePicker onChange={handleChange} />
    </div>
  );
}

export default TinyCalendar;
