import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar, { formatDate } from "@fullcalendar/react"; //must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; //plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Grid,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
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
  const authData = useSelector((state) => state.authData);
  const calendarRef = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    dispatch(getEvents(user?.result?._id));
    console.log(user);
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
          author: user?.result?._id,
        }),
        user.result._id
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
      <Dialog open={showAddEvent} onClose={handleCloseAddEvent}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of your event.</DialogContentText>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <Grid
          container
          className="button"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Button
            onClick={handleCloseAddEvent}
            variant="outlined"
            color="primary"
          >
            Add Event
          </Button>
        </Grid>
      </Dialog>

      <Dialog open={showRemoveEvent} onClose={handleCloseRemoveEvent}>
        <DialogTitle>Remove Event</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this event from your calendar?
        </DialogContent>
        <Grid
          container
          className="buttons"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            onClick={() => {
              dispatch(deleteEvent(currentId));
              handleCloseRemoveEvent();
            }}
            variant="outlined"
            color="primary"
          >
            Yes, remove it
          </Button>
          <Button
            onClick={handleCloseRemoveEvent}
            variant="outlined"
            color="primary"
            className="modalButton"
          >
            No, I want to keep it
          </Button>
        </Grid>
      </Dialog>

      <div id="calDiv">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarRef}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          contentHeight="90vh"
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true} //draws a placeholder event in time view, I like it but we can scrap
          dayMaxEvents={true} //prevents the calendar from resizing at month view if too many events
          // initialEvents={events}
          select={handleOpenAddEvent}
          eventClick={handleOpenRemoveEvent}
          handleWindowResize={true}
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
