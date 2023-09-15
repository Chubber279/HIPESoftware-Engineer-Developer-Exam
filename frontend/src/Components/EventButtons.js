import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export const EventButtons = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventIndex, setEventIndex] = useState("");

  const closeModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  const openCreateEvent = () => {
    closeModal();
    setShowCreateModal(true);
  };

  const openUpdateEvent = () => {
    closeModal();
    setShowUpdateModal(true);
  };

  const openDeleteEvent = () => {
    closeModal();
    setShowDeleteModal(true);
  };

  const clearValues = () => {
    setName("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setEventIndex("");
  };

  const createEvent = () => {
    const updatedEventData = {
      name: name,
      description: description,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .post("http://localhost:8080/events", updatedEventData)
      .then((response) => {
        console.log("Event Created successfully:", response.data);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error Creating event:", error);
        window.alert(error.response.data.message);
      });
    closeModal();
    clearValues();
  };

  const updateEvent = () => {
    const updatedEventData = {
      name: name,
      description: description,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .put(`http://localhost:8080/events/${eventIndex}`, updatedEventData)
      .then((response) => {
        console.log("Event Updated successfully:", response.data);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error Updating event:", error);
        window.alert(error.response.data.message);
      });
    closeModal();
    clearValues();
  };

  const deleteEvent = () => {
    axios
      .delete(`http://localhost:8080/events/${eventIndex}`)
      .then((response) => {
        console.log("Event Deleted successfully:", response.data);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error Deleting event:", error);
        window.alert(error.response.data.message);
      });
    closeModal();
    clearValues();
  };

  return (
    <div>
      <Button variant="primary" onClick={openCreateEvent}>
        Create Event
      </Button>
      <Button variant="warning" onClick={openUpdateEvent}>
        Update Event
      </Button>
      <Button variant="danger" onClick={openDeleteEvent}>
        Delete Event
      </Button>

      {/* Create Event Modal */}
      <Modal show={showCreateModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createEvent}>
            Create Event
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Event Modal */}
      <Modal show={showUpdateModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Event Index</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Index"
              value={eventIndex}
              onChange={(e) => setEventIndex(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateEvent}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Event Modal */}
      <Modal show={showDeleteModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Event Index</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Index"
              value={eventIndex}
              onChange={(e) => setEventIndex(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteEvent}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
