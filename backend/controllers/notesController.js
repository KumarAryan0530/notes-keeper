const pool = require('../db/pool');

// Get all notes - pinned first, then by latest
const getAllNotes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notes 
       ORDER BY is_pinned DESC, created_at DESC`
    );
    
    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: error.message
    });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content, color } = req.body;

  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Content is required'
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notes (title, content, color, is_pinned, created_at, updated_at)
       VALUES ($1, $2, $3, false, NOW(), NOW())
       RETURNING *`,
      [title.trim(), content.trim(), color || '#fff']
    );

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: error.message
    });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, color, is_pinned } = req.body;

  // Validation
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid note ID is required'
    });
  }

  try {
    // Check if note exists
    const checkResult = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Prepare update fields
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }

    if (content !== undefined) {
      updates.push(`content = $${paramCount++}`);
      values.push(content);
    }

    if (color !== undefined) {
      updates.push(`color = $${paramCount++}`);
      values.push(color);
    }

    if (is_pinned !== undefined) {
      updates.push(`is_pinned = $${paramCount++}`);
      values.push(is_pinned);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `UPDATE notes SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating note',
      error: error.message
    });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  // Validation
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid note ID is required'
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: error.message
    });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
};
