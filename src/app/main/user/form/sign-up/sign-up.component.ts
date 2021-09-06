import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

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
    this.userService.register(this.form.value).subscribe(sub => {
      console.log(sub);
    })

    this.form.reset();
  }

  get getControl() {
    return this.form.controls;
  }

}
