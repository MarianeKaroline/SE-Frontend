import { UploadImageService } from './../../../shared/upload-image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  form: FormGroup;
  fileToUpload: File = null;
  fileName = '';
  file: any;

  constructor(private productsService: ProductsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private upload: UploadImageService) { }

  ngOnInit(): void {
    this.formConfig();
  }

  formConfig() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      detail: [null, Validators.required],
      amount: [null, Validators.required],
      categoryId: [null, Validators.required],
      ranking: [0],
      available: [true],
      rating: [0],
      image: [this.fileName, Validators.required]
    });
  }

  register() {
    console.log(this.form.value)
    this.productsService.add(this.form.value)
    .subscribe(product => console.log(product));

    this.upload.postFile(this.file)
    .subscribe(file => console.log(file));

    this.router.navigateByUrl('/product/all-products');
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.form.controls['image'].setValue(this.file ? this.file.name : '');
    }
  }

  /* Validations */
  nameError() {
    if (this.form.get('name').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  priceError() {
    if (this.form.get('price').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  detailError() {
    if (this.form.get('detail').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  amountError() {
    if (this.form.get('amount').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  categoryError() {
    if (this.form.get('categoryId').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  imageError() {
    if (this.form.get('image').hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  get getControl() {
    return this.form.controls;
  }
}
