
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
		const events = await Event.find();
		res.json(events);
	
});
// Create a new event
router.post('/', async (req, res) => {
	const event = new Event({...req.body});
		const newEvent = await event.save();
		res.json(newEvent);
	});

// Delete an event
router.delete('/:id', async (req, res) => {	
		await Event.findByIdAndDelete(req.params.id);
		console.log('Event deleted');
		res.json({ message: 'Event deleted' });
	
});
// Update an event by ID
router.put('/:id', async (req, res) => {
	const eventId = req.params.id;
	const { title, date, reminder } = req.body;

		// Find the event by ID in the database
		const event = await Event.findById(eventId);
		event.date = date;
		event.title = title;
		event.reminder = reminder;
		await event.save();

		res.json(event);
	});

module.exports = router;
