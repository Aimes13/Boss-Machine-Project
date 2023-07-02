// Mount meetingsRouter
const meetingsRouter = require('express').Router();

// Import helper functions
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
  const meetingsArray = getAllFromDatabase('meetings');
  res.send(meetingsArray);
});

// Create a new meeting and save to database
meetingsRouter.post('/', (req, res, next) => {
  let addMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(addMeeting);
});

// Delete all meetings from database
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;