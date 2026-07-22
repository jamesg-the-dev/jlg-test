import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { NotificationStackComponent } from './components/notification-stack/notification-stack.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, LoadingBarComponent, NotificationStackComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
