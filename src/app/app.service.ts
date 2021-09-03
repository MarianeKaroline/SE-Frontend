import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class AppService {
  ipAddress: string;

  constructor(private http: HttpClient) {}

  public getIpAddress() {
    return this.getIp()
    .subscribe((ip: any) => {
      this.ipAddress = ip
      console.log(ip);
      window.localStorage.setItem('token', this.ipAddress);
    });
  }

  private getIp() {
    return this.http.get(apiUrl + "/user/ip")
      .pipe(
        take(1)
      );
  }
}
