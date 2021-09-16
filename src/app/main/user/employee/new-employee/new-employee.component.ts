import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewEmployeeComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) { }

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
      employee: [true],
      accessInventory: [false],
      accessRegister: [false]
    });
  }

  register() {
    this.userService.register(this.form.value).subscribe(sub => {
      console.log(sub);
    })

    this.router.navigateByUrl('/user/employeer/get-employees')
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
