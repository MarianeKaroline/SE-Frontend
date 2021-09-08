import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { mainContentAnimation } from './animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    mainContentAnimation()
  ]
})
export class AppComponent implements OnInit {
  sidebarOpen=false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    if (localStorage.getItem('sessionId') == null)
      this.appService.getIpAddress();
  }

  sidebarToggler() {
    return this.sidebarOpen = this.appService.sidebarOpen;
  }
}
