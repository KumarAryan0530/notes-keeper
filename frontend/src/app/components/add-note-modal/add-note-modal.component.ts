import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-add-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-note-modal.component.html',
  styleUrls: ['./add-note-modal.component.css']
})
export class AddNoteModalComponent {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Note>();

  title: string = '';
  content: string = '';
  selectedColor: string = '#fff';

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

  closeModal(): void {
    this.onClose.emit();
  }

  saveNote(): void {
    if (this.title.trim() && this.content.trim()) {
      const note: Note = {
        title: this.title,
        content: this.content,
        color: this.selectedColor,
        is_pinned: false
      };
      this.onSave.emit(note);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.selectedColor = '#fff';
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
