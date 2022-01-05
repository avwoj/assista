import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar, { formatDate } from "@fullcalendar/react"; //must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; //plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../actions/calendar";
import axios from "axios";
import moment from "moment";

// https://fullcalendar.io/docs#toc

function Calendar() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showRemoveEvent, setShowRemoveEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [eventInfo, setEventInfo] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
    handleDateSelect();
  };

  const handleOpenAddEvent = (selectInfo) => {
    setShowAddEvent(true);
    // console.log(selectInfo);
    setEventInfo(selectInfo);
  };

  const handleCloseRemoveEvent = () => {
    setShowRemoveEvent(false);
  };
  const handleOpenRemoveEvent = (clickInfo) => {
    setShowRemoveEvent(true);
    setCurrentId(clickInfo.event.extendedProps._id);
  };

  const handleDateSelect = () => {
    let calendarApi = eventInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      dispatch(
        createEvent({
          title,
          start: eventInfo.start,
          startStr: eventInfo.startStr,
          end: eventInfo.end,
          endStr: eventInfo.endStr,
          allDay: eventInfo.allDay,
        })
      );
    }
    setTitle("");
  };

  const findEvent = (id) => {
    let data = events.filter((event) => event._id === id);
    console.log(data);
  };

  return (
    <>
      <Modal show={showAddEvent} onHide={handleCloseAddEvent}>
        <Modal.Header>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter the name of your event.
          {
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRemoveEvent} onHide={handleCloseRemoveEvent}>
        <Modal.Header>
          <Modal.Title>Remove Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this event from your calendar?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(deleteEvent(currentId));
              handleCloseRemoveEvent();
            }}
          >
            Yes, remove it
          </Button>
          <Button variant="secondary" onClick={handleCloseRemoveEvent}>
            No, I want to keep it
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarRef}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true} //draws a placeholder event in time view, I like it but we can scrap
          dayMaxEvents={true} //prevents the calendar from resizing at month view if too many events
          // initialEvents={events}
          select={handleOpenAddEvent}
          eventClick={handleOpenRemoveEvent}
          eventDrop={(eventDropInfo) => {
            console.log(eventDropInfo.event);
            console.log(eventDropInfo.event.extendedProps._id);
            dispatch(
              updateEvent(eventDropInfo.event.extendedProps._id, {
                title: eventDropInfo.event.title,
                start: eventDropInfo.event.start,
                startStr: eventDropInfo.event.startStr,
                end: eventDropInfo.event.end,
                endStr: eventDropInfo.event.endStr,
                allDay: eventDropInfo.allDay,
              })
            );
          }}
        />
      </div>
    </>
  );
}

export default Calendar;
