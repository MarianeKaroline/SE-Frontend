import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _employee = new BehaviorSubject<boolean>(false);
  public employee = this._employee.asObservable();

  private _sessionId = new BehaviorSubject<string>(null);
  public sessionId = this._sessionId.asObservable();

  constructor() {
    this._sessionId.next(localStorage.getItem('sessionId'));
    let aux = localStorage.getItem('employee');

    if (aux != null)
      this._employee.next(JSON.parse(aux));

  }

  /* ------------ Public  ------------ */

  public setSessionId(session: string) {
    this._sessionId.next(session);

    window.localStorage.setItem('sessionId', session);
  }

  public setEmployee(employee: boolean) {
    this._employee.next(employee);

    window.localStorage.setItem('employee', employee.toString());
  }

  public getEmployee() {
    return this._employee.value;
  }

  public getSessionId() {
    return this._sessionId.value;
  }

  /* ------------ Public  ------------ */
}
