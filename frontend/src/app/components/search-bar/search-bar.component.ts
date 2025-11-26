import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() onSearch = new EventEmitter<string>();

  searchQuery: string = '';

  onSearchInput(): void {
    this.onSearch.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch.emit('');
  }
}
