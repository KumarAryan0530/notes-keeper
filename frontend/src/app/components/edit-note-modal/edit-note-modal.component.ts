import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-edit-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.css']
})
export class EditNoteModalComponent {
  @Input() note!: Note;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Note>();

  editedTitle: string = '';
  editedContent: string = '';
  editedColor: string = '';

  colors = [
    '#fff',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8'
  ];

  ngOnInit(): void {
    if (this.note) {
      this.editedTitle = this.note.title;
      this.editedContent = this.note.content;
      this.editedColor = this.note.color;
    }
  }

  closeModal(): void {
    this.onClose.emit();
  }

  saveNote(): void {
    if (this.editedTitle.trim() && this.editedContent.trim()) {
      const updatedNote: Note = {
        ...this.note,
        title: this.editedTitle,
        content: this.editedContent,
        color: this.editedColor
      };
      this.onSave.emit(updatedNote);
    }
  }

  selectColor(color: string): void {
    this.editedColor = color;
  }
}
