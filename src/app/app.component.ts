import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CartService } from './main/cart/cart.service';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpen = false;

  constructor(private appService: AppService, private cartService: CartService) {
    this.cartService.added$
      .pipe(untilDestroyed(this))
      .subscribe(open => this.sidebarOpen = open);
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
