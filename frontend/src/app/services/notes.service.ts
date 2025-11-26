import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiClient: AxiosInstance;
  private apiUrl = 'http://localhost:5000/notes';

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Get all notes
  getNotes(): Promise<Note[]> {
    return this.apiClient
      .get<{ success: boolean; data: Note[] }>('/notes')
      .then(response => response.data.data)
      .catch(error => {
        console.error('Error fetching notes:', error);
        throw error;
      });
  }

  // Create a new note
  createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> {
    return this.apiClient
      .post<{ success: boolean; data: Note }>('/notes', note)
      .then(response => response.data.data)
      .catch(error => {
        console.error('Error creating note:', error);
        throw error;
      });
  }

  // Update a note
  updateNote(id: number, note: Partial<Note>): Promise<Note> {
    return this.apiClient
      .put<{ success: boolean; data: Note }>(`/notes/${id}`, note)
      .then(response => response.data.data)
      .catch(error => {
        console.error('Error updating note:', error);
        throw error;
      });
  }

  // Delete a note
  deleteNote(id: number): Promise<Note> {
    return this.apiClient
      .delete<{ success: boolean; data: Note }>(`/notes/${id}`)
      .then(response => response.data.data)
      .catch(error => {
        console.error('Error deleting note:', error);
        throw error;
      });
  }
}
