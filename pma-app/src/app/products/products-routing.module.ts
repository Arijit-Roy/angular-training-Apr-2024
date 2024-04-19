import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { UpdateProductComponent } from "./components/update-product/update-product.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";

const productRoutes: Routes = [
  {
    path: 'products',
    children: [
      {path: '', component: ProductListComponent},
      {path: 'add', component: AddProductComponent},
      {path: 'update/:id', component: UpdateProductComponent},
      {path: 'view/:id', component: ProductDetailComponent}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule{

}