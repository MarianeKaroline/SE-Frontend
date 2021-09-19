import { take } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable()
export class AppService {

  public ip: string;
  public route: string;

  constructor(private http: HttpClient) { }

  public getIpAddress() {
    this.http
    .get("http://api.ipify.org/?format=json")
    .subscribe((ip: any) => {
      this.ip = ip.ip;
      window.localStorage.setItem('sessionId', this.ip);
    });
  }

  public getIp() {
    return this.http
    .get("http://api.ipify.org/?format=json")
    .pipe(take(1));
  }
}
