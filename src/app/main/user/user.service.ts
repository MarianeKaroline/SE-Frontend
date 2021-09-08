import { ShowAddressModel } from './models/showAddress.model';
import { state } from '@angular/animations';
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

  private address$ = new BehaviorSubject<ShowAddressModel[]>([]);
  public address = this.address$.asObservable();

  sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = localStorage.getItem('sessionId');
  }

  public login(model: {email: string, password: string}) {
    return this.signIn(model);
  }

  public register(model: {
    cpf: string,
    fullName: string,
    phone: string,
    email: string,
    birthDate: Date,
    password: string,
    employee: boolean,
    accessInventory: boolean,
    accessRegister: boolean
  }) {
    return this.signUp(model);
  }

  public addAddress(
    model: {
      postCode: string,
      street: string,
      number: string,
      city: string,
      state: string,
      cpf: string
    }
  )
  {
    return this.addAddress$(model);
  }

  public showAddresses() {
    return this.showAddresses$();
  }

  public addCard(
    model:
    {
      cardNumber: string,
      name: string,
      shelfLife: Date,
      cvv: string,
      cpf: string
    }
  )
  {
    return this.addCard$(model);
  }

  private signIn(model: {email: string, password: string}) {
    return this.http
      .post<UserModel>(`${apiUrl}/user/signin`, model)
      .pipe(
        take(1)
      )
  }

  private signUp(model: {
                  cpf: string,
                  fullName: string,
                  phone: string,
                  email: string,
                  birthDate: Date,
                  password: string,
                  employee: boolean,
                  accessInventory: boolean,
                  accessRegister: boolean
                })
  {
    return this.http
      .post(`${apiUrl}/client/signup`, model)
      .pipe(
        take(1)
      )
  }

  private addAddress$(model: {
                      postCode: string,
                      street: string,
                      number: string,
                      city: string,
                      state: string,
                      cpf: string
                    })
  {
    return this.http
    .post(`${apiUrl}/client/address`, model)
    .pipe(
      take(1)
    )
  }

  private showAddresses$() {
    return this.http
    .get<ShowAddressModel[]>(`${apiUrl}/client/address/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }

  private addCard$(
    model:
    {
      cardNumber: string,
      name: string,
      shelfLife: Date,
      cvv: string,
      cpf: string
    }
  )
  {
    return this.http
    .post(`${apiUrl}/client/creditcard`, model)
    .pipe(
      take(1)
    )
  }
}
