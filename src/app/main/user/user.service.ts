import { RegisteredModel } from './models/registered.model';
import { CartService } from './../cart/cart.service';
import { AppService } from 'src/app/app.service';
import { CreditCardModel } from './models/credit-card.model';
import { AddressModel } from './models/address.model';
import { SignUpModel } from './models/sign-up.model';
import { ShowCardModel } from './models/showCard.model';
import { ShowAddressModel } from './models/showAddress.model';
import { take } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private static _employee = new BehaviorSubject<boolean>(false);
  public employee = UserService._employee.asObservable();

  private static _sessionId = new BehaviorSubject<string>(null);
  public sessionId = UserService._sessionId.asObservable();

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private cartService: CartService
  ) {
    UserService._sessionId.next(localStorage.getItem('sessionId'));
    let aux = localStorage.getItem('employee');
    if (aux != null) {
      UserService._employee.next(JSON.parse(aux));

      this.cartService.setSessionId(localStorage.getItem('sessionId'));
      this.cartService.setVerifyEmployee(JSON.parse(aux));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  /* ---- Public ---- */
  public login(model: {email: string, password: string}) {
    this.subscriptions.push(this._signIn(model)
    .subscribe(user => {
      if (user != null) {
        UserService._sessionId.next(user.cpf);
        UserService._employee.next(user.employee);

        this.cartService.setSessionId(user.cpf);
        this.cartService.setVerifyEmployee(user.employee);

        if (!user.employee) {
          this.cartService.passItems();
        }

        window.localStorage.setItem('sessionId', user.cpf);
        window.localStorage.setItem('employee', user.employee.toString());
      }
    }));

    return this._signIn(model);
  }

  public signUp(model: SignUpModel) {
    return this._signUp(model);
  }

  public addAddress(model: AddressModel)
  {
    return this._addAddress(model);
  }

  public getAddresses() {
    return this._getAddresses();
  }

  public addCreditCard(model: CreditCardModel)
  {
    return this._addCreditCard(model);
  }

  public GetCreditCards() {
    return this._getCreditCards();
  }

  public LoggOut() {
    this.appService.getIpAddress();
    this.cartService.removeList();

    this.subscriptions.push(this.appService.getIp().subscribe((res: any) => {
      UserService._sessionId.next(res.ip);
    }));

    if (this.employee) {
      UserService._employee.next(false);
      window.localStorage.setItem('employee', "false");
    }
  }

  public getEmployees() {
    return this._getEmployee();
  }

  public register(model: SignUpModel) {
    return this._register(model);
  }

  public getEmployee() {
    return UserService._employee.value;
  }

  public getSessionId() {
    return UserService._sessionId.value;
  }
  /* ---- end Public ---- */


  /* ---- Private ---- */
  private _signIn(model: {email: string, password: string}) {
    return this.http
    .post<UserModel>(`${apiUrl}/user/signin`, model)
    .pipe(
      take(1)
    );
  }

  private _signUp(model: SignUpModel)
  {
    return this.http
    .post(`${apiUrl}/client/signup`, model)
    .pipe(
      take(1)
    );
  }

  private _addAddress(model: AddressModel)
  {
    return this.http
    .post<number>(`${apiUrl}/client/address`, model)
    .pipe(
      take(1)
    )
  }

  private _getAddresses() {
    return this.http
    .get<ShowAddressModel[]>(`${apiUrl}/client/address/${UserService._sessionId.value}`)
    .pipe(
      take(1)
    );
  }

  private _addCreditCard(model: CreditCardModel)
  {
    return this.http
    .post<number>(`${apiUrl}/client/creditcard`, model)
    .pipe(
      take(1)
    );
  }

  private _getCreditCards() {
    return this.http
    .get<ShowCardModel[]>(`${apiUrl}/client/creditcard/${UserService._sessionId.value}`)
    .pipe(
      take(1)
    );
  }

  private _getEmployee() {
    return this.http
    .get<RegisteredModel[]>(`${apiUrl}/employee/employees`)
    .pipe(
      take(1)
    );
  }

  private _register(model: SignUpModel) {
    return this.http
    .post<boolean>(`${apiUrl}/employee/register`, model)
    .pipe(
      take(1)
    );
  }
  /* ---- end Private ---- */
}
