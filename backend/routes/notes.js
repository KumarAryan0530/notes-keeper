const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// GET all notes
router.get('/', notesController.getAllNotes);

// POST create a new note
router.post('/', notesController.createNote);

// PUT update a note
router.put('/:id', notesController.updateNote);

// DELETE a note
router.delete('/:id', notesController.deleteNote);

module.exports = router;
