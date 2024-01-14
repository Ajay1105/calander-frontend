import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const AllEvents = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        setEvents(response.data);
      } catch (error) {
        alert("API Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {events &&
        events.map((event) => 
          <EventCard event={event} key={event._id}/>
        )}
    </div>
  );
};

export default AllEvents;
