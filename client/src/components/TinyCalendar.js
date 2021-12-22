import React, { useState, useEffect } from 'react';
import DatePicker from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './tinyCalendar.css'

function TinyCalendar() {
  const [value, setDate] = useState(new Date());

  useEffect(() => {

    console.log(value)
    console.log("toLocaleString: " + value.toLocaleString());
    console.log("toLocaleDateString: " + value.toLocaleDateString());
    console.log("toDateString: " + value.toDateString());

  }, [value])

  return (
    <div className='tiny'>
      <DatePicker
        onChange={setDate}
        value={value}
      />
    </div>
  );
}

export default TinyCalendar