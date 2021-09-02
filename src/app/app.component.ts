import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ipAddress: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getIpAddress();
  }

  getIpAddress() {
    this.getIp().subscribe((ip: any) => {
      this.ipAddress = ip
      console.log(ip);
      window.localStorage.setItem('token', this.ipAddress);
    })
  }

  private getIp() {
    return this.http.get(apiUrl + "/user/ip")
      .pipe(
        take(1)
      );
  }
}
