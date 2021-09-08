import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class AppService {

  private sidebarState = 'close';
  private sidebarChanged = new BehaviorSubject<string>(this.sidebarState);
  public sidebarStateObservable = this.sidebarChanged.asObservable();
  public sidebarOpen: boolean;
  public ip: string;

  constructor(private http: HttpClient)
  {
    this.sidebarChanged.next('close');
  }

  public getIpAddress() {
    this.http
    .get("http://api.ipify.org/?format=json")
    .subscribe((ip: any) => {
      this.ip = ip.ip;
      window.localStorage.setItem('sessionId', this.ip);
    });
  }

  public sidebarToggler(sidebarOpen: boolean) {
    this.sidebarOpen = !sidebarOpen;
  }
}
