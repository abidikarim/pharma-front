import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-shell',
  imports: [
    RouterOutlet,
    AdminHeaderComponent
  ],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.css'
})
export class AdminShellComponent {

}
