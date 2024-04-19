import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PRODUCT_SERVICE_TOKEN } from '../../../config/constant';
import { DataService } from '../../../models/product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnDestroy{
  txtValue = '';
  txtValue1 = '';

  sub?:Subscription;

  // userNameCtrl = new FormControl('');
  // passwdCtrl = new FormControl('');

  // loginForm = new FormGroup({
  //   username: this.userNameCtrl,
  //   password: this.passwdCtrl
  // })

  // loginForm = new FormGroup({
  //   username: new FormControl('Enter User Name', [Validators.required, Validators.email]),
  //   password: new FormControl("Enter password", Validators.required)
  // })

  addForm: FormGroup;

    get productId(){
    return this.addForm?.get('productId')
  }

  get productName(){
    return this.addForm?.get('productName')
  }

  get productCode(){
    return this.addForm?.get('productCode')
  }

  get price(){
    return this.addForm?.get('price')
  }

  get description(){
    return this.addForm?.get('description')
  }

  get starRating(){
    return this.addForm?.get('starRating')
  }

  get releaseDate(){
    return this.addForm?.get('releaseDate')
  }


  get imageUrl(){
    return this.addForm?.get('imageUrl')
  }


  constructor(private _builder: FormBuilder, @Inject(PRODUCT_SERVICE_TOKEN) private _ps: DataService, private _router: Router, 
){
    this.addForm = this._builder.group({
      productId: ['Enter product ID', Validators.required],
      productName: ['Product Name', Validators.required],
      productCode: ['Product Code', Validators.required],
      price: ['Price', Validators.required],
      description: ['description', Validators.required],
      starRating: ['starRating', Validators.required],
      releaseDate: ['releaseDate', Validators.required],
      imageUrl: ['imageUrl', Validators.required],
    })

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.sub?.unsubscribe();
  }

  setInputData(value: string){
    this.txtValue = value;
  }

  addData(){
    console.log("here")
    this.sub = this._ps.addProduct(this.addForm.value).subscribe({
      next: (response)=>{
        alert (response.message);

        if(response.data !== null){
          this._router.navigate(['/products'])
        }
      }
    })
  }

  // get uname(){
  //   return this.loginForm.controls['username']
  // }

  // get upwd(){
  //   return this.loginForm.controls['password']
  // }

  // submit(){
  //   console.log(this.loginForm)
  // }
}
