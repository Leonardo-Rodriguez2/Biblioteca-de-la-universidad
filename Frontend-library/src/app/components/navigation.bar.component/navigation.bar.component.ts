import { Component, Input, Output, EventEmitter } from '@angular/core'; // Añadimos Output y EventEmitter
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.bar.component.html',
  styleUrls: ['./navigation.bar.component.css'],
})
export class NavigationBarComponent {
  @Input() isSidebarOpen: boolean = true;
  
  // Nuevo: Evento para cerrar cuando se toca fuera
  @Output() closeSidebar = new EventEmitter<void>();

  onOverlayClick() {
    this.closeSidebar.emit();
  }

  data() {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
  }

  user = this.data;

  ClosetSession(){
    localStorage.removeItem('token');
    location.reload();
  }

}