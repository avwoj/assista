import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; //must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; //plugins
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  let str = formatDate(new Date(), {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  console.log(str);
  const [title, setTitle] = useState("");
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
      />
    </div>
  );
}

export default Calendar;
