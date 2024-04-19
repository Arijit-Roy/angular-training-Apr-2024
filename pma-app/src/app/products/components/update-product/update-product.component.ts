import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { PRODUCT_SERVICE_TOKEN } from '../../../config/constant';
import { ApiResponse, DataService, Product } from '../../../models/product';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsRoutingModule } from '../../products-routing.module';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit, OnDestroy{
  sub?: Subscription;
  updateSub?: Subscription;
  productInfo?:Product;
  errorMessage = '';
  requestCompleted = false;

  updateForm?:FormGroup;

  constructor(private currentRoute:ActivatedRoute, 
    private _router: Router, 
    @Inject(PRODUCT_SERVICE_TOKEN) private _ps: DataService,
    private _builder:FormBuilder,
){}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.sub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  get productId(){
    return this.updateForm?.get('productId')
  }

  get productName(){
    return this.updateForm?.get('productName')
  }

  get productCode(){
    return this.updateForm?.get('productCode')
  }

  get price(){
    return this.updateForm?.get('price')
  }

  get description(){
    return this.updateForm?.get('description')
  }

  get starRating(){
    return this.updateForm?.get('starRating')
  }

  get releaseDate(){
    return this.updateForm?.get('releaseDate')
  }


  get imageUrl(){
    return this.updateForm?.get('imageUrl')
  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.currentRoute.params.subscribe().
    const snapShot: ActivatedRouteSnapshot = this.currentRoute.snapshot;
    const allParams: Params = snapShot.params;
    let id = Number(allParams['id']);

    this.sub = this._ps
    .getProductById(id)
    .subscribe({
      next: (response: ApiResponse<Product>) => {
        if(response.data !=null){
          this.productInfo = response.data;
          this.errorMessage = '';
          this.requestCompleted = true;
        } else {
          // this.productInfo = null;
          this.errorMessage = 'Could not load data';
          this.requestCompleted = true;
        }
      }, 
      error: (e: Error)=>{
        this.errorMessage = e.message;
        this.requestCompleted = true;
      }, 
      complete: ()=>{
        if(this.productInfo) {
          const {productId, productName, productCode, price, description, imageUrl, starRating,releaseDate} = this.productInfo;
          this.updateForm = this._builder.group({
            productId: [productId],
            productName: [productName, Validators.required],
            productCode: [productCode, Validators.required],
            price: [price, Validators.required],
            description: [description, Validators.required],
            starRating: [starRating, Validators.required],
            releaseDate: [releaseDate, Validators.required],
            imageUrl: [imageUrl, Validators.required],
          })
        } 
      }
    })
  }

  updateData(){
    if(confirm("Are u sure?"))
      if(this.productInfo){
        this.updateSub = this._ps.updateProduct(<Product>this.updateForm?.value, this.productId?.value ).subscribe
        ({
          next:(response)=>{
            if(response.data === null){
              alert(response.message);
            }else {
              alert(response.message)
              this._router.navigate(['/products'])
            }
          }
        })

      }
  }

  // clearForm(){
  //   this.productId?
  // }
}
