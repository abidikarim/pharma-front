import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../client-header/client-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-client-shell',
  imports: [
    ClientHeaderComponent,
    RouterOutlet,
    FooterComponent 
  ],
  templateUrl: './client-shell.component.html',
  styleUrl: './client-shell.component.css'
})
export class ClientShellComponent {

}
