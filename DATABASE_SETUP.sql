-- SQL Setup Script for Notes App Database
-- Run this script to create the database and tables

-- Create database
CREATE DATABASE notes_app;

-- Connect to the database
\c notes_app;

-- Create notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    color VARCHAR(7) DEFAULT '#fff',
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
-- Index on created_at for sorting
CREATE INDEX idx_created_at ON notes(created_at DESC);

-- Index on is_pinned for pinned notes first
CREATE INDEX idx_is_pinned ON notes(is_pinned DESC);

-- Combined index for common query (is_pinned DESC, created_at DESC)
CREATE INDEX idx_pinned_created ON notes(is_pinned DESC, created_at DESC);

-- Insert sample data (optional)
INSERT INTO notes (title, content, color, is_pinned) VALUES
    ('Welcome to Notes Keeper', 'This is your first note! Click on a card to edit or delete it.', '#fff', true),
    ('Shopping List', 'Milk, Eggs, Bread, Butter, Cheese', '#ccff90', false),
    ('Project Ideas', 'Create a notes app, Build a portfolio, Learn TypeScript', '#aecbfa', false),
    ('Important Meeting', 'Schedule meeting with team on Friday at 2 PM', '#f28b82', true),
    ('Grocery Store', 'Open: Mon-Sun 8AM-10PM, Location: 123 Main St', '#fbbc04', false);

-- View created tables
\dt;

-- View table structure
\d notes;

-- Check indexes
\di;

-- Select all notes to verify
SELECT * FROM notes ORDER BY is_pinned DESC, created_at DESC;
