import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SharedLibService } from "shared-lib";

@Component({
  selector: 'app-shell-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';

  copyrightMsg = '';

  constructor(private sharedLibService : SharedLibService) {
    this.copyrightMsg = sharedLibService.getCopyrightMessage();
  }

}
