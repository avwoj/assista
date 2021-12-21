import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; //must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; //plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  let str = formatDate(new Date(), {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  // console.log(str);outputs current day, format December 21, 2021 (ex.)

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(), need a new function for id creation, will add in later
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    prompt(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    );
    console.log(clickInfo.event);
    //need to update the functionality on this, just wanted to see if I could actually do it.
    clickInfo.event.remove();
  };

  const [title, setTitle] = useState("");
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true} //draws a placeholder event in time view, I like it but we can scrap
        dayMaxEvents={true} //prevents the calendar from resizing at month view if too many events
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default Calendar;
