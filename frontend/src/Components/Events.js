import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { EventButtons } from "./EventButtons";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  const convertDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleString();

  useEffect(() => {
    // Only fetch events if shouldFetch is true
    if (shouldFetch) {
      axios
        .get("http://localhost:8080/events")
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events", error);
        })
        .finally(() => {
          setShouldFetch(false);
        });
    }
  }, [shouldFetch]);
  return (
    <>
      <Container>
        <h1>Events</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.id} - {event.name} - {event.description} -{" "}
              {convertDate(event.start_time)} - {convertDate(event.end_time)}
            </li>
          ))}
        </ul>
        <EventButtons setShouldFetch={setShouldFetch} />
      </Container>
    </>
  );
};
