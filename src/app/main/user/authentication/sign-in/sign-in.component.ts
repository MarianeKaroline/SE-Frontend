import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

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
    private formBuilder: FormBuilder
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
    this.userService.login(this.form.value).subscribe()

    this.employee = this.userService.employee;
    if (this.employee) {
      this.router.navigateByUrl("/user/employeer/profile");
    }
    this.form.reset();
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
