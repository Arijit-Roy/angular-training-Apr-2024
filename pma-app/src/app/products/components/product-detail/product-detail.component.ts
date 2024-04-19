import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { PRODUCT_SERVICE_TOKEN } from '../../../config/constant';
import { ApiResponse, DataService, Product } from '../../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  sub?: Subscription;
  productInfo?:Product;
  errorMessage = '';
  requestCompleted = false

  constructor(private currentRoute:ActivatedRoute, 
    private _router: Router, 
    @Inject(PRODUCT_SERVICE_TOKEN) private _ps: DataService
){
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.currentRoute.params.subscribe().
    const snapShot: ActivatedRouteSnapshot = this.currentRoute.snapshot;
    const allParams: Params = snapShot.params;
    let id = Number(allParams['id']);

    this.sub = this._ps.getProductById(id)
    .subscribe({
      next: (response: ApiResponse<Product>) => {
        if(response.data !=null){
          this.productInfo = response.data
          this.errorMessage = '';
          this.requestCompleted = true;
        } else {
          // this.productInfo = null;
          this.errorMessage = 'Could not load data'
          this.requestCompleted = true;
        }
      }
    })
  }

  goToUpdate(id: number){
    this._router.navigate(['/products/update/', this.productInfo?.productId]);
  }

}
