import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Manga-library';
}
