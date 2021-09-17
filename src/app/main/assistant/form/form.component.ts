import { AssistantService } from './../assistant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private assistantService: AssistantService) { }

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.form = this.formBuilder.group({
      from: [null, [Validators.email, Validators.required]],
      name: [null, Validators.required],
      destination: ["single.experience@gmail.com"],
      messageSubject: [null, Validators.required],
      messageBody: [null, Validators.required]
    });
  }

  sendMessage() {
    this.assistantService.sendEmail(this.form.value).
      subscribe(bool => console.log(bool));
  }

  /* Validations */
  getNameMessage() {
    if (this.form.get("name").hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getEmailMessage() {
    if (this.form.get("from").hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get("from").hasError('email')
      ? 'Invalid email'
      : '';
  }

  getSubjectMessage() {
      if (this.form.get("messageSubject").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }

  getMessage() {
      if (this.form.get("messageBody").hasError('required')) {
        return 'You must enter a value';
      }

    return '';
  }
  /* Validations */

  get getControl() {
    return this.form.controls;
  }

}
