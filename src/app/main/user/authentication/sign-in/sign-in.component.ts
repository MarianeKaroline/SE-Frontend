import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';
import { AuthenticationService } from '../authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  employee: boolean;
  form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  login() {
    this.userService.login(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if (res == null) {
          this._snackBar.open("User doesn't exist", "close", {
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
          });
          this.router.navigateByUrl("/user/auth");
        }
      });

    this.authService.employee
      .pipe(untilDestroyed(this))
      .subscribe(res => this.employee = res);

    if (this.employee) {
      this.router.navigateByUrl("/user/employeer/profile");
    }

    this.router.navigateByUrl("/");
  }

  /* Validations */
  emailError() {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email').hasError('email') ? 'Email invalid' : '';
  }

  passwordError() {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  get getControl() {
    return this.form.controls;
  }

}
