import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { SuccessDialog } from './../../../shared/dialogs/success/success.dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AssistantService } from './../assistant.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  private _spinner = new BehaviorSubject<boolean>(false);
  public spinner = this._spinner.asObservable();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private assistantService: AssistantService,
    public dialog: MatDialog
  ) { }

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
    this._spinner.next(true);

    this.assistantService.sendEmail(this.form.value)
      .pipe(
        tap(() => {
          this._spinner.next(false);
          const dialogRef = this.dialog.open(SuccessDialog, {
            width: '250px',
            disableClose: false
          });

          dialogRef.afterClosed();
        }),
        untilDestroyed(this)
      )
      .subscribe();

    this.formDirective.resetForm();
    this.form.reset();

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });

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
