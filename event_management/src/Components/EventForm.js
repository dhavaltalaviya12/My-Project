import React, { useState } from 'react';
import './EventForm.css';

function EventForm({ onEventAdd }) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    reminder: false
  });

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
      .then((response) => response.json())
      .then((data) => {
        // On success, add the new event to the list and reset the form
        onEventAdd(data);
        setNewEvent({ title: '', date: '', reminder: false });
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleInputChange}
        required
      />
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={newEvent.date}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
