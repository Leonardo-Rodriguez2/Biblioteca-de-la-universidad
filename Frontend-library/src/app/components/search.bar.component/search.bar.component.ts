import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search.bar.component.html',
})
export class SearchBarComponent {
  // El nombre del evento que escuchará el Layout
  @Output() sidebarToggle = new EventEmitter<void>();

  onToggleClick() {
    console.log('Botón presionado en SearchBar'); // Para debugear
    this.sidebarToggle.emit();
  }
}