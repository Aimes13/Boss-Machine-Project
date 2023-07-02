// Mount ideasRouter
const ideasRouter = require('express').Router();

// Import helper functions
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// ??
ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas');
    res.send(ideasArray);
  });

// Create a new idea and save to database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const addIdea = addToDatabase('ideas', req.body);
  res.status(201).send(addIdea);
});

// Get a single idea by ID
ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

// Update a single idea by ID
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  let ideaUpdate = updateInstanceInDatabase('ideas', req.body);
  res.send(ideaUpdate);
});

// Delete a single idea by ID
ideasRouter.delete('/:id', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.id);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;