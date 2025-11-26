import { Component } from '@angular/core';
import { NotesListComponent } from './components/notes-list/notes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotesListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notes Keeper';
}
