import { ShowCardModel } from './models/showCard.model';
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

  sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = localStorage.getItem('sessionId');
  }

  public login(model: {email: string, password: string}) {
    return this._signIn(model);
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
    return this._signUp(model);
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
    return this._addAddress(model);
  }

  public showAddresses() {
    return this._showAddresses();
  }

  public addCard(
    model:
    {
      cardNumber: string,
      name: string,
      shelfLife: string,
      cvv: string,
      cpf: string
    }
  )
  {
    return this._addCard(model);
  }

  public showCard() {
    return this._showCard();
  }

  private _signIn(model: {email: string, password: string}) {
    return this.http
      .post<UserModel>(`${apiUrl}/user/signin`, model)
      .pipe(
        take(1)
      )
  }

  private _signUp(model: {
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

  private _addAddress(model: {
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

  private _showAddresses() {
    return this.http
    .get<ShowAddressModel[]>(`${apiUrl}/client/address/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }

  private _addCard(
    model:
    {
      cardNumber: string,
      name: string,
      shelfLife: string,
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

  private _showCard() {
    return this.http.get<ShowCardModel[]>(`${apiUrl}/client/creditcard/${this.sessionId}`)
    .pipe(
      take(1)
    )
  }
}
