import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
// import { products } from '../../../../data/products';
import { ApiResponse, DataService, Product } from '../../../models/product';
import { ProductService } from '../../services/product.services';
import { PRODUCT_SERVICE_TOKEN } from '../../../config/constant';
import { Subscription } from 'rxjs';
// import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  // providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy{
  products?: Product[];
  filterText = '';
  loadingCompleted = false;
  errorMessage = ''

  private subscription?: Subscription;
  private delsubscription?: Subscription


  // private ps: DataService;

  constructor(@Inject(PRODUCT_SERVICE_TOKEN) private _ps: DataService){
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.delsubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this._ps.getProducts().subscribe(
      {
        next: (data:ApiResponse<Product[]>) => {
          this.products = data.data || [];
          this.errorMessage = '';
          this.loadingCompleted = true;
        },
        error: (e) => {
          this.products = [];
          this.errorMessage = e.message;
          this.loadingCompleted = true;
        }
      }
    );
    // products.subscribe
  }

  async getProducts(){
    this._ps
  }
  deleteRow(product:Product){
    if(confirm("Are you sure?")){
      console.log(product);
      this.delsubscription = this._ps.deleteProduct(product.productId).subscribe(
        {
          next:(data: ApiResponse<Product[]>)=>{
              alert("Deleted");
              this.products = data.data || [];
              this.errorMessage = '';
              this.loadingCompleted = true;
          },
          error: (e) => {
            this.products = [];
            this.errorMessage = e.message;
            this.loadingCompleted = true;
          }
        }
      );
    }
  }

  updateFilterText(text:string){
    this.filterText = text;
  }
}
