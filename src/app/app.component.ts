import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from "./messages/messages.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterLink, RouterOutlet, MessagesComponent]
})
export class AppComponent {
  title = 'Standalone Tour of Heroes';
}
