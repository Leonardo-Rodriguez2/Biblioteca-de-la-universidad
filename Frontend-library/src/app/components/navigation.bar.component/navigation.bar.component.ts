import { NgClass, NgIf } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.bar.component.html',
  styleUrls: ['./navigation.bar.component.css'],
})
export class NavigationBarComponent {

  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() isSidebarOpenChange = new EventEmitter<boolean>();

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen);
    this.isSidebarOpenChange.emit(this.isSidebarOpen);
    if (this.isSidebarOpen) {
      document.body.classList.remove('sidebar-collapsed');
    } else {
      document.body.classList.add('sidebar-collapsed');
    }
  }

}
