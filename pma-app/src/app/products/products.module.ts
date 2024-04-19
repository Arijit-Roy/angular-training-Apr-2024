import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FilterProductComponent } from './components/filter-product/filter-product.component';
import { ProductsFilterPipe } from './pipes/products-filter.pipe';
import { ProductService } from './services/product.services';
import { PRODUCT_SERVICE_TOKEN, PRODUCT_URL, PRODUCT_URL_TOKEN, SERVICE_CLASS_NAME } from '../config/constant';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    FilterProductComponent,
    ProductsFilterPipe,
    ProductDetailComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:[ProductService, 
  
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: SERVICE_CLASS_NAME
    },
    {
      provide: PRODUCT_URL_TOKEN,
      useValue: PRODUCT_URL
    }],
  bootstrap: [],
  exports: [ProductListComponent, AddProductComponent,],
})
export class ProductsModule { }
