// Mount minionsRouter
const minionsRouter = require('express').Router();

// Import helper functions
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

// Create minion ID parameter??
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// Get all minions
minionsRouter.get('/', (req, res, next) => {
  const minionsArray = getAllFromDatabase('minions');
  res.send(minionsArray);
});

// Create a new minion and save to database
minionsRouter.post('/', (req, res, next) => {
  const addMinion = addToDatabase('minions', req.body);
  res.status(201).send(addMinion);
});

// Get a single minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// Update a single minion by ID
minionsRouter.put('/:minionId', (req, res, next) => {
  let minionUpdate = updateInstanceInDatabase('minions', req.body);
    res.send(minionUpdate);
});

// Delete a single minion by ID
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

// ??
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);
});

// ??
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;
  const createdWork = addToDatabase('work', workToAdd);
  res.status(201).send(createdWork);
});

// ??
minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

// ??
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

// ??
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('work', req.params.workId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = minionsRouter;