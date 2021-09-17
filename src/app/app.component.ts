import { CartService } from './main/cart/cart.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpen = false;

  constructor(private appService: AppService, private cartService: CartService) {
    this.cartService.added$.subscribe(open => this.sidebarOpen = open);
  }

  ngOnInit() {
    if (localStorage.getItem('sessionId') == null)
      this.appService.getIpAddress();
  }

  sidebarToggler() {
    if (this.appService.route == "/cart") {
      return false;
    }
    return this.sidebarOpen;
  }
}
