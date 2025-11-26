import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { HeaderComponent } from '../header/header.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { EditNoteModalComponent } from '../edit-note-modal/edit-note-modal.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    NoteCardComponent,
    SearchBarComponent,
    AddNoteModalComponent,
    EditNoteModalComponent
  ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchQuery: string = '';
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  selectedNote: Note | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.error = null;
    this.notesService
      .getNotes()
      .then(data => {
        this.notes = data;
        this.applySearch();
        this.loading = false;
      })
      .catch(error => {
        console.error('Error loading notes:', error);
        this.error = 'Failed to load notes';
        this.loading = false;
      });
  }

  applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredNotes = [...this.notes];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applySearch();
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  openEditModal(note: Note): void {
    this.selectedNote = { ...note };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedNote = null;
  }

  onNoteAdded(note: Note): void {
    this.notesService
      .createNote({
        title: note.title,
        content: note.content,
        color: note.color,
        is_pinned: false
      })
      .then(() => {
        this.closeAddModal();
        this.loadNotes();
      })
      .catch(error => {
        console.error('Error adding note:', error);
        this.error = 'Failed to add note';
      });
  }

  onNoteUpdated(updatedNote: Note): void {
    if (updatedNote.id) {
      this.notesService
        .updateNote(updatedNote.id, updatedNote)
        .then(() => {
          this.closeEditModal();
          this.loadNotes();
        })
        .catch(error => {
          console.error('Error updating note:', error);
          this.error = 'Failed to update note';
        });
    }
  }

  onNoteDeleted(id: number): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService
        .deleteNote(id)
        .then(() => {
          this.loadNotes();
        })
        .catch(error => {
          console.error('Error deleting note:', error);
          this.error = 'Failed to delete note';
        });
    }
  }

  onNotePinned(note: Note): void {
    if (note.id) {
      this.notesService
        .updateNote(note.id, { is_pinned: !note.is_pinned })
        .then(() => {
          this.loadNotes();
        })
        .catch(error => {
          console.error('Error pinning note:', error);
          this.error = 'Failed to pin note';
        });
    }
  }
}
