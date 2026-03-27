import { Component, Input, Output, EventEmitter, PLATFORM_ID, inject } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
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

  private platformId = inject(PLATFORM_ID);

  onOverlayClick() {
    this.closeSidebar.emit();
  }

  get user() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : {};
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  ClosetSession(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
  }

}