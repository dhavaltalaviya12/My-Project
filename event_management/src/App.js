import React, { useState, useEffect } from 'react';
import EventForm from './Components/EventForm';
import EventList from './Components/EventList';
import './App.css'
import './Components/EventForm.css'

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the server
    fetch('http://localhost:5000/api/events')
      .then(response => response.json()) // Convert response to JSON
      .then(data => setEvents(data))     // Set the events in state
      .catch(error => console.error(error));
  }, []);

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (id) => {
    console.log("delete event " + id);
    // Delete an event
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // If successful, filter out the deleted event from the state
        setEvents(events.filter(event => event._id !== id));
      })
  };

  const handleToggleReminder = (eventId) => {
    // Find the event by ID
    const selectedEvent = events.find(event => event._id === eventId);

    // Toggle the reminder status
    const updatedEvent = { ...selectedEvent, reminder: !selectedEvent.reminder };

    // Update the event in the database
    fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent), // Send updated event data
    })
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        // If successful, update the state
        const updatedEvents = events.map(event =>
          event._id === eventId ? updatedEvent : event
        );
        setEvents(updatedEvents);
      })
  };

  const onEventEdit = (eventId, updatedData) => {
    // Update the event in the database
    fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // Send the updated event data
    })
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        // If successful, update the state
        const updatedEvents = events.map(event =>
          event._id === eventId ? { ...event, ...updatedData } : event
        );
        setEvents(updatedEvents);
      })
  };

  return (
    <div className='main-container'>
      <h1 className='heading'>Dhaval Talaviya</h1>
      <h2>Event Management App</h2>
      <EventForm onEventAdd={handleEventAdd} />
      <EventList
        events={events}
        onEventDelete={handleEventDelete}
        onToggleReminder={handleToggleReminder}
        onEventEdit={onEventEdit}
      />
    </div>
  );
};

export default App;
