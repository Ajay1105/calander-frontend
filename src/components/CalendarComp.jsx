import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

//import events from "../events";
import EventInfo from "./EventInfo";

const localizer = momentLocalizer(moment);

const CalendarComp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        const formattedEvents = response.data.map((event) => ({
          ...event,
          title:event.eventName,
          startDateTime: moment(event.startDateTime).toDate(),
          endDateTime: moment(event.endDateTime).toDate(),
        }));
        setEvents(formattedEvents);

      } catch (error) {
        alert("API Error:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEventDisplay = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  }

  const closeEventInfo = () => {
    setIsOpen(false);
  }

  return (
    <div>
    {isOpen && <EventInfo event={selectedEvent} toggle={closeEventInfo}/>}
      {events && (
        <>
          <div>
            <label className="inline-block text-lg font-bold mb-2">
              Go To:
            </label>
            <input
              type="date"
              className="inline-block p-2 border border-gray-300 rounded w-fit ml-5"
              value={moment(selectedDate).format("YYYY-MM-DD")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          <div style={{ height: 700 }}>
            <Calendar
              localizer={localizer}
              events={events}
              //views={["month", "week", "day"]}
              defaultView="month"
              startAccessor="startDateTime"
              endAccessor="endDateTime"
              onSelectEvent={(event) => handleEventDisplay(event)}
              date={selectedDate}
              onNavigate={(date) => setSelectedDate(date)}
              className="mx-5 rounded-xl"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarComp;
