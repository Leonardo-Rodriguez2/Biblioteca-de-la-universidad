import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation.bar.component/navigation.bar.component';
import { SearchBarComponent } from '../../components/search.bar.component/search.bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [NavigationBarComponent, SearchBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

}
