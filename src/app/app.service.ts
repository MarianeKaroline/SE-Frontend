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
  public ipAddress: string;

  constructor(private http: HttpClient)
  {
    this.sidebarChanged.next('close');
  }

  public getIpAddress() {
    return this.getIp()
    .subscribe((ip: any) => {
      this.ipAddress = ip
      console.log(ip);
      window.localStorage.setItem('token', this.ipAddress);
    });
  }

  public sidebarToggler(sidebarOpen: boolean) {
    this.sidebarOpen = !sidebarOpen;
  }

  private getIp() {
    return this.http.get(apiUrl + "/user/ip")
      .pipe(
        take(1)
      );
  }
}
