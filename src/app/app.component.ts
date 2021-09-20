import { CartService } from './main/cart/cart.service';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  sidebarOpen = false;

  constructor(private appService: AppService, private cartService: CartService) {
    this.subscriptions.push(this.cartService.added$.subscribe(open => this.sidebarOpen = open));
  }

  ngOnInit() {
    if (localStorage.getItem('sessionId') == null)
      this.appService.getIpAddress();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  sidebarToggler() {
    if (this.appService.route == "/cart") {
      return false;
    }
    return this.sidebarOpen;
  }
}
