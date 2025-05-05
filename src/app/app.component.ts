import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,  // 👈 necesario para usarlo sin NgModule
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms-app';
}
