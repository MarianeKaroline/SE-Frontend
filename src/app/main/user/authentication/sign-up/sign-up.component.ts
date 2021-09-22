import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.form = this.formBuilder.group({
      cpf: [null, [Validators.pattern('^[0-9]{11}$'), Validators.required]],
      fullName: [null, Validators.required],
      phone: [null, [Validators.pattern('^[0-9]{11}$'), Validators.required]],
      birthDate: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      employee: [false],
      accessInventory: [false],
      accessRegister: [false]
    });
  }

  signUp() {
    this.userService.signUp(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(sub => console.log(sub));

    this.form.reset();
  }

  /* Validations */
  cpfError() {
    if (this.form.get('cpf').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('cpf').hasError('pattern') ? 'CPF may only contain number and must have 11 digits' : '';
  }

  fullNameError() {
    if (this.form.get('fullName').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  phoneError() {
    if (this.form.get('phone').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('phone').hasError('pattern') ? 'Phone may only contain number and must have 11 digits' : '';
  }

  birthDateError() {
    if (this.form.get('birthDate').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

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
