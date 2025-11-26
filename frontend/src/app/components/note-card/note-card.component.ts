import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() onEdit = new EventEmitter<Note>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onPin = new EventEmitter<Note>();

  editNote(): void {
    this.onEdit.emit(this.note);
  }

  deleteNote(): void {
    if (this.note.id) {
      this.onDelete.emit(this.note.id);
    }
  }

  pinNote(): void {
    this.onPin.emit(this.note);
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const noteDate = new Date(date);
    
    return noteDate.toLocaleString([], { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  }

  formatTime(date: string | undefined): string {
    if (!date) return '';
    const noteDate = new Date(date);
    
    return noteDate.toLocaleString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
