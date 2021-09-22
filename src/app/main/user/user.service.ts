import { CartService } from './../cart/cart.service';
import { AuthenticationService } from './authentication/authentication.service';
import { RegisteredModel } from './models/registered.model';
import { CreditCardModel } from './models/credit-card.model';
import { AddressModel } from './models/address.model';
import { SignUpModel } from './models/sign-up.model';
import { ShowCardModel } from './models/showCard.model';
import { ShowAddressModel } from './models/showAddress.model';
import { take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { AppService } from 'src/app/app.service';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {
  sessionId: string;
  employee: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private appService: AppService,
    private cartService: CartService
  ) {
    this.authService.sessionId.subscribe(session => this.sessionId = session);

    this.authService.employee.subscribe(employee => this.employee = employee);
  }

  /* ---- Public ---- */
  public login(model: { email: string; password: string }) {
    this._signIn(model).subscribe((user) => {
      if (user != null) {
        this.authService.setSessionId(user.cpf);
        this.authService.setEmployee(user.employee);

        if (user.employee == false) {
          this.cartService.passItems();
        }
      }
    });

    return this._signIn(model);
  }

  public signUp(model: SignUpModel) {
    return this.http.post(`${apiUrl}/client/signup`, model).pipe(take(1));
  }

  public LoggOut() {
    this.appService.getIpAddress();

    this.appService.getIp().subscribe((res: any) => {
      this.authService.setSessionId(res.ip);
    });

    this.cartService.removeList();

    if (this.employee) {
      this.authService.setEmployee(false);
      window.localStorage.setItem('employee', 'false');
    }
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

  public getEmployees() {
    return this._getEmployee();
  }

  public register(model: SignUpModel) {
    return this._register(model);
  }
  /* ---- end Public ---- */


  /* ---- Private ---- */

  private _signIn(model: { email: string; password: string }) {
    return this.http
      .post<UserModel>(`${apiUrl}/user/signin`, model)
      .pipe(take(1));
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
    .get<ShowAddressModel[]>(`${apiUrl}/client/address/${this.sessionId}`)
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
    .get<ShowCardModel[]>(`${apiUrl}/client/creditcard/${this.sessionId}`)
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
