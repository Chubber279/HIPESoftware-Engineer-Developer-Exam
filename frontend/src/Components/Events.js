import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

export const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
      });
  }, []);

  return (
    <>
      <Container>
        <h1>Events</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - {event.description}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};
