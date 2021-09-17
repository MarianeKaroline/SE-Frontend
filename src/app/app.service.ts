import { CartService } from './main/cart/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable()
export class AppService {

  public ip: string;
  public route: string;

  constructor(private http: HttpClient,
              private cartService: CartService) { }

  public getIpAddress() {
    this.http
    .get("http://api.ipify.org/?format=json")
    .subscribe((ip: any) => {
      this.ip = ip.ip;
      window.localStorage.setItem('sessionId', this.ip);
    });
  }
}
