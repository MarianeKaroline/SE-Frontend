import { take } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class UserService {
  private user = new BehaviorSubject<UserModel[]>([]);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  public login(model: {email: string, password: string}) {
    return this.signIn(model);
  }

  private signIn(model: {email: string, password: string}) {
    return this.http
      .post<UserModel>(`${apiUrl}/user/signin`, model)
      .pipe(
        take(1)
      )
  }
}
