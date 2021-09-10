import { CartService } from './../../main/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TotalCartModel } from 'src/app/main/cart/models/totalCart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home: any;
  total: TotalCartModel;

  constructor(private router: Router, private cartService: CartService) {
    this.cartService.getTotal();

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
        this.home = event.url;
    });
  }

  ngOnInit(): void {

    this.cartService.totalCart$
    .subscribe(total => this.total = total)
  }

}
