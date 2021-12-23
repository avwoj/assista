import React, { useState, useEffect, useRef } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; //must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; //plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./calendar.css"
// https://fullcalendar.io/docs#toc

function Calendar() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showRemoveEvent, setShowRemoveEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
    handleDateSelect();
  };

  const handleOpenAddEvent = (selectInfo) => {
    setShowAddEvent(true);
    setEventInfo(selectInfo);
  };

  const handleCloseRemoveEvent = () => {
    setShowRemoveEvent(false);
  };
  const handleOpenRemoveEvent = (clickInfo) => {
    setShowRemoveEvent(true);
    setDeleteInfo(clickInfo);
  };

  // let str = formatDate(new Date(), {
  //   month: "long",
  //   year: "numeric",
  //   day: "numeric",
  // });
  // console.log(str);outputs current day, format December 21, 2021 (ex.)

  const handleDateSelect = () => {
    let calendarApi = eventInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(), need a new function for id creation, will add in later
        title,
        start: eventInfo.startStr,
        end: eventInfo.endStr,
        allDay: eventInfo.allDay,
      });
    }
    setTitle("");
  };

  const deleteEvent = () => {
    deleteInfo.event.remove();
    handleCloseRemoveEvent();
  };

  return (
    <div className="fullCalendar">
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
