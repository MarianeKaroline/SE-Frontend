import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

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
    this.userService.login(this.form.value).subscribe(login => {
      window.localStorage.setItem('sessionId', login.cpf);
    })

    this.form.reset();
  }

  get getControl() {
    return this.form.controls;
  }

}
